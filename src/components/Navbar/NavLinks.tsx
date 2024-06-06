import { NavLink } from 'react-router-dom'


type Props = {}

const NavLinks = (props: Props) => {
  return (
    <div className='flex space-x-2 md:space-x-8'>
      <div><NavLink to={'/'}>Home</NavLink></div>
      <div><NavLink to={'/maintenance'}>Maintenance</NavLink></div>
    </div>
  )
}

export default NavLinks