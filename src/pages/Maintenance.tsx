import MaintenanceList from '../components/Maintenance/MaintenanceList'
import AddMaintenance from '../components/Maintenance/AddMaintenance'

type Props = {}

const Maintenance = (props: Props) => {
  return (
    <div>
      <AddMaintenance/>
      <MaintenanceList/>
    </div>
  )
}

export default Maintenance