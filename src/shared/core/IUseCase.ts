export default interface IUseCase<IRequest = 'any', IResponse = 'any'> {
  execute(request?: IRequest): Promise<IResponse> | IResponse;
}
