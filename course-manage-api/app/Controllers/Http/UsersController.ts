import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import { create, findAll, findOne, modify, remove } from 'App/Services/CRUDMethod'
import { USER_ID } from 'App/Utils/constants'
import UserValidator from 'App/Validators/UserValidator'

export default class UsersController {
  public async index(ctx: HttpContextContract) {
    await findAll(User, ctx)
  }

  public async store(ctx: HttpContextContract) {
    await create(User, ctx, UserValidator)
  }

  public async show(ctx: HttpContextContract) {
    await findOne(User, ctx, USER_ID)
  }

  public async update(ctx: HttpContextContract) {
    await modify(User, ctx, UserValidator, USER_ID)
  }

  public async destroy(ctx: HttpContextContract) {
    await remove(User, ctx, USER_ID)
  }
}
