export interface Login {
  email: string;
  password: string;
}

export interface Register {
  email: string;
  password: string;
  confirmPassword: string;
}

export interface Endpoint extends NewEndpoint {
  userId: string;
  _id: string;
  createdOn: Date;
  isActive: boolean;
  isUp: boolean;
  nextHeartbeatDate: Date;
  status: string;
}

export interface NewEndpoint {
  url: string;
  statusCode: number;
  responseTime: number;
  frequency: number;
  interval: string;
  timeToWaitBetweenNotificationsFrequency: number;
  timeToWaitBetweenNotificationsInterval: string;
}

export interface EndpointMessage {
  _id: string;
  endpointId: string;
  userId: string;
  dateTime: Date;
  isManualCheck: boolean;
  message: string;
  ok: boolean;
  responseTime: number;
  status: string;
}
