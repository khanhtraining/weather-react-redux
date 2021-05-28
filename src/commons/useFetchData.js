import { useState, useEffect } from 'react'

export const useFetchData = (url, initialData = [], dependencies = []) => {
    const [data, setData] = useState(initialData)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
           setLoading(true)
            try {
                const response = await fetch(url)
                const convertedResponse = await response.json()
                setData(convertedResponse.data)
                setLoading(false)
            } catch (err) {
                setError(err)
            }
        }
        fetchData()

    }, dependencies)

    return { data, loading, error }
}
export default useFetchData