import Link from 'next/link'

export const Navbar = () => {
  return (

    <nav className='bg-gray-800 p-4'>
      <ul className='flex space-x-4'>
        <li>
          <Link href='/' className='text-white'>
            Top
          </Link>
        </li>
        <li>
          <Link href='/logintest' className='text-white'>
            ログインテスト
          </Link>
        </li>
        <li>
          <Link href='/session' className='text-white'>
            セッション表示
          </Link>
        </li>
        <li>
          <Link href='/registration' className='text-white'>
            登録
          </Link>
        </li>
        <li>
          <Link href='/reference' className='text-white'>
            参照
          </Link>
        </li>
        <li>
          <Link href='/table' className='text-white'>
            DataTable
          </Link>
        </li>
        <li>
          <Link href='/tabs' className='text-white'>
            Tabs
          </Link>
        </li>
        <li>
          <Link href='/card' className='text-white'>
            Card
          </Link>
        </li>
        <li>
          <Link href='/checkbox' className='text-white'>
            CheckBox
          </Link>
        </li>
        <li>
          <Link href='/datepicker' className='text-white'>
            DatePicker
          </Link>
        </li>
      </ul>
    </nav>
  )
}
