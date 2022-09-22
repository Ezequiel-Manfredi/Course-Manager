import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Course from 'App/Models/Course'
import StudentCourse from 'App/Models/StudentCourse'
import { COURSE_ID } from 'App/Utils/constants'
import StudentCourseValidator from 'App/Validators/StudentCourseValidator'

export default class StudentCoursesController {
  public async index({ request, response }: HttpContextContract): Promise<void> {
    const courseId: number = request.param(COURSE_ID)
    const course = await Course.query()
      .where('id', courseId)
      .preload('students', (query) => {
        query.pivotColumns(['absence_count', 'attendance_count', 'class_count']).orderBy('gender')
      })
      .withCount('students')
      .firstOrFail()

    response.ok({ total: parseInt(course.$extras.students_count), result: course.students })
  }

  public async store({ request, response }: HttpContextContract): Promise<void> {
    const id: number = request.param(COURSE_ID)
    request.updateBody({ ...request.body(), courseId: id })
    const { studentsId, courseId } = await request.validate(StudentCourseValidator)

    const list = studentsId.map(
      async (studentId: number) => await StudentCourse.firstOrCreate({ courseId, studentId })
    )
    const students = await Promise.all(list)

    response.ok(students)
  }

  public async destroy({ request, response }: HttpContextContract): Promise<void> {
    const { studentId, courseId } = request.params()
    const relationship = await StudentCourse.query()
      .where('course_id', courseId)
      .andWhere('student_id', studentId)
      .firstOrFail()

    await relationship.delete()

    response.ok(null)
  }
}