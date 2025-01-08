import { useState, useCallback } from 'react'

interface AsyncState<T> {
  data: T | null
  isLoading: boolean
  error: Error | null
}

export function useAsync<T>() {
  const [state, setState] = useState<AsyncState<T>>({
    data: null,
    isLoading: false,
    error: null,
  })

  const execute = useCallback(async (promise: Promise<T>) => {
    setState({ data: null, isLoading: true, error: null })
    
    try {
      const data = await promise
      setState({ data, isLoading: false, error: null })
      return data
    } catch (error) {
      setState({ data: null, isLoading: false, error: error as Error })
      throw error
    }
  }, [])

  return { ...state, execute }
}