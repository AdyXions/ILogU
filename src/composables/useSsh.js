
export const getOS = async serverId => {
  const response = await $api('/ssh', {
    method: 'POST',
    header: {
      'Content-Type': "application/json",
    },
    body: JSON.stringify({
      "command": "cat /etc/os-release",
      "server_id": serverId,
    }),
  })

  const result = await response.text()
  const lines = result.trim().split('\n')
  const entry = {}

  lines.forEach(line => {
    const [key, value] = line.split('=')

    entry[key] = value.replace(/"/g, '')
  })
  
  return entry
}

export const getSpecification = async serverId => {
  const response = await $api('/ssh', {
    method: 'POST',
    header: {
      'Content-Type': "application/json",
    },
    body: JSON.stringify({
      "command": "lscpu",
      "server_id": serverId,
    }),
  })

  const result = await response.text()
  const lines = result.trim().split('\n')
  const headers = lines[0].split(/\s+/)
  const entry = {}

  lines.slice(1).forEach(line => {
    const values = line.split(/\s+/)
    const key = values[0].replace(':', '').toLowerCase()
    const value = values.slice(1).join(' ')

    entry[key] = value
  })

  return entry
}

export const getCpuUsage = async serverId => {
  const response = await $api('/ssh', {
    method: 'POST',
    header: {
      'Content-Type': "application/json",
    },
    body: JSON.stringify({
      "command": "grep 'cpu ' /proc/stat | awk '{usage=($2+$4)/($2+$4+$5)} END {print usage}'",
      "server_id": serverId,
    }),
  })

  return (await response.text())
}

export const getMemoryUsage = async serverId => {
  const response = await $api('/ssh', {
    method: 'POST',
    header: {
      'Content-Type': "application/json",
    },
    body: JSON.stringify({
      "command": "free | grep Mem | awk '{print $3/$2}'",
      "server_id": serverId,
    }),
  })

  return (await response.text())
}

export const getVolumes = async serverId => {
  const response = await $api('/ssh', {
    method: 'POST',
    header: {
      'Content-Type': "application/json",
    },
    body: JSON.stringify({
      "command": "df",
      "server_id": serverId,
    }),
  })

  const result = await response.text()
  const lines = result.trim().split('\n')
  const headers = lines[0].split(/\s+/)

  return lines.slice(1).map(line => {
    const values = line.split(/\s+/)
    const entry = {}

    headers.forEach((header, index) => {
      entry[header] = values[index]
    })
    
    return entry
  })
}