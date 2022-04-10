import { AxiosResponse } from 'axios'

import http from '@/commons/http'

export function qrKey(): Promise<AxiosResponse> {
  return http.get('/login/qr/key')
}

interface qrCreateParams {
  key: string,
  qrimg?: string
}

export function qrCreate(params: qrCreateParams): Promise<AxiosResponse> {
  return http.get('/login/qr/create', {
    params
  })
}