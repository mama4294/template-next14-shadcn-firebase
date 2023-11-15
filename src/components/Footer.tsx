function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="flex bg-background h-16 w-full items-center justify-between px-4 text-xs sm:text-sm">
      <div>Matthew Malone</div>
      <div className="flex">
        <p>Copyright © {currentYear}</p>
        <p>All right reserved</p>
      </div>
    </footer>
  );
}

export default Footer;
