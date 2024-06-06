import VehicleList from '../components/Vehicle/VehicleList'
import AddVehicle from '../components/Vehicle/AddVehicle';


type Props = {}

const Home = (props: Props) => {
  return (
    <div className='items-center'>
      <AddVehicle/>
      <VehicleList/>
    </div>
  )
}

export default Home