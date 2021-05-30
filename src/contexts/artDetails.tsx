import React, { useEffect, useState, useContext } from 'react'

export const ArtDetailsContext = React.createContext({
  visible: false,
  data: [],
  setData: (data: any) => {},
})

export const ArtDetailsProvider = ({ children = null as any }) => {
  const [data, setData] = useState([])
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    data.length ? setVisible(true) : setVisible(false)
  }, [data])

  return (
    <ArtDetailsContext.Provider
      value={{
        visible,
        data,
        setData,
      }}
    >
      {children}
    </ArtDetailsContext.Provider>
  )
}

export const useArtDetails = () => {
  const { visible, data, setData } = useContext(ArtDetailsContext)
  return {
    visible,
    data,
    setData,
  }
}
