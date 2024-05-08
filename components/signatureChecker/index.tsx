import { CheckIcon } from '../icons/checkIcon'
import { CrossIcon } from '../icons/crossIcon'

export const SignatureChecker = ({ status }: { status: string | boolean }) => {
  let content
  if (typeof status === 'string' && status.toLowerCase() === 'pendent') {
    content = <h1>Waiting</h1>
  } else if (status) {
    content = <CheckIcon />
  } else {
    content = <CrossIcon />
  }

  return content
}
