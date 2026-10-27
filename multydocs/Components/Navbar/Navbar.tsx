const Navbar = () => {
  return (
    <>
      <nav className="relative z-10 flex h-(--nav-height) items-center justify-between border-b border-white/8 px-5 sm:px-12 lg:px-24">
        <a href="/" className="flex items-center gap-3">
          <img src={"logo.svg"} alt="MMC-logo" className="w-12" />
          <h1 className="text-(--brand-orange) font-black">MultyDocs</h1>
        </a>
      </nav>
      <hr />
    </>
  )
}

export default Navbar