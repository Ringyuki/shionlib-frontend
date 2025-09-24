import { Phase } from '@/libs/uploader/uploader'

export const PhaseMap: Record<Phase, string> = {
  idle: 'Idle',
  hashing: 'Hashing',
  initializing: 'Initializing',
  uploading: 'Uploading',
  paused: 'Paused',
  completed: 'Completed',
  aborted: 'Aborted',
  error: 'Error',
  completing: 'Completing',
}
