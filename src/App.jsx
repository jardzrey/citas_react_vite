import { useState, useEffect } from "react"
import Header from "./components/Header"
import Formulario from "./components/Formulario"
import ListadoPacientes from "./components/ListadoPacientes"

function App() {
  const initialState = []
  const [pacientes, setPacientes] = useState(initialState)
  const [paciente, setPaciente] = useState({})

  useEffect(() => {
    const obtenerLS = () => {
      const pacientesLS = JSON.parse(localStorage.getItem('pacientes'))
      if(pacientesLS) {
        setPacientes(pacientesLS)
      }
    }
    obtenerLS()
  }, [])

  useEffect(() => {
    if(pacientes !== initialState) {
      localStorage.setItem('pacientes', JSON.stringify(pacientes))
    }
  }, [pacientes, initialState])

  const eliminarPaciente = (id) => {
    const pacientesAcutalizados = pacientes.filter( paciente  => paciente.id !== id)
    
    setPacientes(pacientesAcutalizados)
  }
  
  return (
    <div className="container mx-auto mt-20">
      <Header />

      <div className="mt-12 md:flex">
        <Formulario 
          pacientes={pacientes}
          setPacientes={setPacientes}
          paciente={paciente}
          setPaciente={setPaciente}
        />
        <ListadoPacientes
          pacientes={pacientes}
          setPaciente={setPaciente}
          eliminarPaciente={eliminarPaciente}
        />
      </div>
    </div>
  )
}

export default App
