import { describe, it, expect } from "vitest"

import { GoogleLogin } from "./GoogleLogin"
import { CurrentAccount } from "../../models/CurrentAccount"
import { UnauthorizedError } from "../../output/http/errors/UnauthorizedError"

import type { SetCurrentAccountPersisterOutputPort }
from "../../output/persistance/CurrentAccountPersisterOutputPort"

import type { GetHttpClientOutputPort }
from "../../output/http/HttpClientOutputPort"

import type { GoogleLoginPresenter }
from "./GoogleLogin"


class HttpClientMock implements GetHttpClientOutputPort {

  getCallCount = 0
  receivedUrl: string | null = null

  response: unknown | null = null
  errorToThrow: Error | null = null

  async get<T>(props: { url: string }): Promise<T> {
    this.getCallCount++
    this.receivedUrl = props.url

    if (this.errorToThrow) throw this.errorToThrow

    return this.response as T
  }

}

class CurrentAccountPersisterMock implements SetCurrentAccountPersisterOutputPort {

  setCallCount = 0
  savedAccount: CurrentAccount | null = null

  async set(account: CurrentAccount): Promise<void> {
    this.setCallCount++
    this.savedAccount = account
  }

}

class PresenterMock implements GoogleLoginPresenter {

  successCallCount = 0
  errorCallCount = 0
  unauthorizedCallCount = 0

  receivedAccount: CurrentAccount | null = null
  receivedError: Error | null = null

  handleDefaultError(e: Error): void {
    this.errorCallCount++
    this.receivedError = e
  }

  handleDefaultSuccess(currentAccount: CurrentAccount): void {
    this.successCallCount++
    this.receivedAccount = currentAccount
  }

  handleUnauthorizedError(): void {
    this.unauthorizedCallCount++
  }

}

function makeSut() {
  const httpClient = new HttpClientMock()
  const persister = new CurrentAccountPersisterMock()
  const presenter = new PresenterMock()

  const sut = new GoogleLogin(persister, httpClient, presenter)

  return { sut, httpClient, persister, presenter }
}

describe("GoogleLogin", () => {

  it("deve chamar o httpClient com a url correta", async () => {
    const { sut, httpClient } = makeSut()

    httpClient.response = {
      name: "Bruno",
      email: "bruno@email.com"
    }

    await sut.perform()

    expect(httpClient.getCallCount).toBe(1)
    expect(httpClient.receivedUrl).toContain("/auth/me")
  })



  it("deve salvar a conta atual quando login for bem sucedido", async () => {
    const { sut, httpClient, persister } = makeSut()

    httpClient.response = {
      name: "Bruno",
      email: "bruno@email.com",
      profilePicUrl: "pic.png"
    }

    await sut.perform()

    expect(persister.setCallCount).toBe(1)

    expect(persister.savedAccount?.name).toBe("Bruno")
    expect(persister.savedAccount?.email).toBe("bruno@email.com")
  })



  it("deve chamar handleDefaultSuccess quando login for bem sucedido", async () => {

    const { sut, httpClient, presenter } = makeSut()

    httpClient.response = {
      name: "Bruno",
      email: "bruno@email.com"
    }

    await sut.perform()

    expect(presenter.successCallCount).toBe(1)
    expect(presenter.receivedAccount?.name).toBe("Bruno")

  })



  it("deve chamar handleUnauthorizedError quando receber UnauthorizedError", async () => {

    const { sut, httpClient, presenter } = makeSut()

    httpClient.errorToThrow = new UnauthorizedError()

    await sut.perform()

    expect(presenter.unauthorizedCallCount).toBe(1)
    expect(presenter.successCallCount).toBe(0)

  })



  it("deve chamar handleDefaultError quando ocorrer erro inesperado", async () => {

    const { sut, httpClient, presenter } = makeSut()

    const error = new Error("network error")
    httpClient.errorToThrow = error

    await sut.perform()

    expect(presenter.errorCallCount).toBe(1)
    expect(presenter.receivedError).toBe(error)

  })

})