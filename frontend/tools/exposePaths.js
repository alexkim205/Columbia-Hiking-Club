import path from 'path'

// Project Directories
export const backendPath = path.resolve(__dirname, '..', 'backend/')
export const frontendPath = path.resolve(__dirname, '..')

// Server Ports
export const DEV_PORTS = {
  server: 3000,
  ui: 3001
}
export const BUILD_PORTS = {
  server: 4000,
  ui: 4001
}
export const DJANGO_PORTS = {
  server: 8000
}

export const DEV_SERVER = `http://localhost:${DEV_PORTS.server}/`
export const BULID_SERVER = `http://localhost:${BUILD_PORTS.server}/`
