import NavbarComponent from './Navbar/NavbarComponent'
import Logo from './Logo'

type Props = {}

const Header = (props: Props) => {
  return (
    <div className='bg-dark-bckground sticky top-0 flex-wrap z-20 mx-auto flex w-full items-center justify-between border-b bordeer-gray-500 p-8 text-lg font-semibold'>
        <Logo/>
        <NavbarComponent/>
    </div>
  )
}

export default Header