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
