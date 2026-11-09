interface HeaderProps {
  name: string;
  showWork: boolean;
}

export default function Header({ name, showWork }: HeaderProps) {
  return (
    <header className="site-header">
      <div className="wrap">
        <a className="wordmark" href="#top">
          {name}
        </a>
        <nav className="site-nav" aria-label="Main">
          {showWork && <a href="#work">Work with me</a>}
          <a href="#background">Experience</a>
          <a href="#skills">Skills</a>
          <a href="#writing">Writing</a>
          <a href="#contact">Contact</a>
          <a className="btn btn-primary btn-sm" href="#contact">
            Book a call
          </a>
        </nav>
      </div>
    </header>
  );
}
