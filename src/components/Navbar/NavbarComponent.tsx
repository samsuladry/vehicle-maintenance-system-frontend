import NavLinks from './NavLinks';
import SmallNavLinks from './SmallNavLinks';

type Props = {}

const NavbarComponent = (props: Props) => {

  return (
    <div className='flex'>
      <div className='hidden md:flex'>
        <NavLinks />
      </div>
      <div className="md:hidden">
        <SmallNavLinks/>
      </div>
    </div>
  )
}

export default NavbarComponent