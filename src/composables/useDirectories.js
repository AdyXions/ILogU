export const getDirectory = async (server, query) => {
  try {
    return await $api('/ssh/directory', {
      method: "POST",
      header: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        'path': query,
        "server_id": server,
      }),
    })
  } catch (error) {
    console.log(error)
  }
}

export const getFile = async (server, query) => {
  try {
    const response = await $api('/ssh/directory/file/download', {
      method: "POST",
      header: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        'path': query,
        "server_id": server,
      }),
    })

    return (await response.text())
  } catch (error) {
    console.log(error)
  }
}

export const renameFile = async (server, query, oldName, newName) => {
  
  try {
    const response = await $api('/ssh', {
      method: "POST",
      header: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        'command': `mv ${query}/${oldName} ${query}/${newName}`,
        "server_id": server,
      }),
    })
  } catch (error) {
    console.log(error)
  }
}

export const deleteFile = async (server, query, fileName) => {
  
  try {
    const response = await $api('/ssh', {
      method: "POST",
      header: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        'command': `rm ${query}/${fileName}`,
        "server_id": server,
      }),
    })
  } catch (error) {
    console.log(error)
  }
}


