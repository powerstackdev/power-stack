"use server"

export const triggerRevalidation = async (path) => {
  const secret = process.env.NEXT_REVALIDATE_SECRET
  const baseUrl = process.env.NEXT_HOST // This should ideally be kept secure
  const revalidateUrl = `${baseUrl}/api/revalidate?path=${path}&secret=${secret}`

  try {
    const response = await fetch(revalidateUrl, {
      method: "GET",
    })
    const result = await response
    if (result.ok) {
      console.log("Page revalidated successfully")
    } else {
      console.error("Failed to revalidate")
    }
  } catch (error) {
    console.error("Error triggering revalidation:", error)
  }
  const revalidateEditUrl = `${baseUrl}/api/revalidate?path=/edit/[...puckPath]/page&secret=${secret}`
  try {
    const response = await fetch(revalidateEditUrl, {
      method: "GET",
    })
    const result = await response
    if (result.ok) {
      console.log("Page revalidated successfully")
    } else {
      console.error("Failed to revalidate")
    }
  } catch (error) {
    console.error("Error triggering revalidation:", error)
  }
}
