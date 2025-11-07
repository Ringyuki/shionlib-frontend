export const check = async (
  protocol: string,
  host: string,
  port: number,
  path: string,
  auth_secret: string,
) => {
  const data = {
    jsonrpc: '2.0',
    method: 'aria2.getVersion',
    id: 'get_version_check',
    params: ['token:' + auth_secret],
  }

  try {
    const url = `${protocol}://${host}:${port}${path}`
    const res = await fetch(url, {
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
  protocol: string,
  host: string,
  port: number,
  path: string,
  auth_secret: string,
  downloadPath?: string,
) => {
  const ready = await check(protocol, host, port, path, auth_secret)
  if (ready !== true) {
    return handleAria2Error(ready)
  }

  const options: any = {
    out: file_name,
  }

  // 如果用户设置了自定义下载路径，则添加dir参数
  if (downloadPath && downloadPath.trim() !== '') {
    options.dir = downloadPath
  }

  const data = {
    jsonrpc: '2.0',
    method: 'aria2.addUri',
    id: 'add_url_' + file_name,
    params: ['token:' + auth_secret, [file_url], options],
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
    const url = `${protocol}://${host}:${port}${path}`
    await fetch(url, {
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
