import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export const errorsCode = {
  E_VALIDATION_FAILURE: (error: any, ctx: HttpContextContract) => ctx.response.badRequest(error.messages),
  E_ROW_NOT_FOUND: (error: any, ctx: HttpContextContract) => ctx.response.notFound(error.messages),
  E_ROUTE_NOT_FOUND: (error: any, ctx: HttpContextContract) => ctx.response.notFound(error.messages),
  E_UNAUTHORIZED_ACCESS: (error: any, ctx: HttpContextContract) => ctx.response.unauthorized(error.messages),
  23505: (error: any, ctx: HttpContextContract) => ctx.response.badRequest({ error: error.detail }),
}