import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { MovileContext } from '../../contexts/MovileContext'
import { LoginContext } from '../../contexts/LoginContext'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { preceptorSchema } from '../../validators/preceptorSchema'
import { apiCall } from '../../services/apiCall'
import { ENDPOINT, METHOD, RESPONSE, ROUTES } from '../../utils/constants'
import './style.css'

export default function CreatePreceptor() {
  const navigator = useNavigate()
  const { login, saveLogin } = useContext(LoginContext)
  const { isMovile } = useContext(MovileContext)
  const { register, handleSubmit, formState: { errors }, setError } = useForm({
    resolver: yupResolver(preceptorSchema)
  })

  const submit = (data) => {
    apiCall({ endpoit: ENDPOINT.PRECEPTORS.MAIN, method: METHOD.POST, body: { ...data }, login })
      .then(({ status, body }) => {
        if (status === RESPONSE.UNAUTHORIZED) navigator(ROUTES.LOGIN)
        if (status === RESPONSE.BAD_REQUEST) body.errors.map((err) => setError(err.field))
        if (status === RESPONSE.CREATED) {
          saveLogin({ ...login, user: { ...login.user, preceptor: body } })
          navigator(ROUTES.COURSES)
        }
      })
  }

  return (
    <form
      className={`perfil-form ${isMovile ? 'perfil-movile' : ''}`}
      onSubmit={handleSubmit(submit)}
    >
      <h2>Perfil de Preceptor</h2>
      <label>
        <input required type="text" placeholder='Primer Nombre'
          name="firstName" {...register('firstName')} autoComplete='off'
        />
        <p>{errors.firstName && 'Primer Nombre invalido'}</p>
      </label>
      <label>
        <input type="text" placeholder='Segundo Nombre'
          name="middleName" {...register('middleName')} autoComplete='off'
        />
        <p>{errors.middleName && 'Segundo Nombre invalido'}</p>
      </label>
      <label>
        <input required type="text" placeholder='Apellido'
          name="lastName" {...register('lastName')} autoComplete='off'
        />
        <p>{errors.lastName && 'Apellido invalido'}</p>
      </label>
      <input type="number" hidden value={login?.user.id} name="userId" {...register('userId')}/>
      <button>Crear Perfil</button>
    </form>
  )
}