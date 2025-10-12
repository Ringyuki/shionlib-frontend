export const check = async (port: number, auth_secret: string) => {
  const data = {
    jsonrpc: '2.0',
    method: 'aria2.getVersion',
    id: 'get_version_check',
    params: ['token:' + auth_secret],
  }

  try {
    const res = await fetch(`http://localhost:${port}/jsonrpc`, {
      method: 'POST',
      body: JSON.stringify(data),
    })
    if (res.ok) {
      return true
    }
    const json = await res.json()
    return {
      success: false,
      details: json.error,
    }
  } catch (error) {
    return {
      success: false,
      details: 'aria2FailedToFetch',
    }
  }
}

export const addUrl = async (
  file_url: string,
  file_name: string,
  port: number,
  auth_secret: string,
) => {
  const ready = await check(port, auth_secret)
  if (ready !== true) {
    return handleAria2Error(ready)
  }

  const data = {
    jsonrpc: '2.0',
    method: 'aria2.addUri',
    id: 'add_url_' + file_name,
    params: [
      'token:' + auth_secret,
      [file_url],
      {
        out: file_name,
      },
    ],
  }

  // try to envoke motrix
  const motrixUrl = `motrix://download/${encodeURIComponent(file_url)}`
  const motrixLink = document.createElement('a')
  motrixLink.href = motrixUrl
  motrixLink.style.display = 'none'
  document.body.appendChild(motrixLink)
  motrixLink.click()
  document.body.removeChild(motrixLink)

  try {
    await fetch(`http://localhost:${port}/jsonrpc`, {
      method: 'POST',
      body: JSON.stringify(data),
    })
  } catch (error) {
    return {
      success: false,
      message: 'aria2FailedToFetch',
    }
  }

  return {
    success: true,
    message: 'aria2Added',
  }
}

const handleAria2Error = (error: any) => {
  if (error.details.message === 'Unauthorized') {
    return {
      success: false,
      message: 'aria2Unauthorized',
    }
  } else if (error.details === 'aria2FailedToFetch') {
    return {
      success: false,
      message: 'aria2FailedToFetch',
    }
  } else {
    return {
      success: false,
      message: 'aria2UnknownError',
    }
  }
}
