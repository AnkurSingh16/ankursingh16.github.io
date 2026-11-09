interface FooterProps {
  name: string;
  location: string;
}

export default function Footer({ name, location }: FooterProps) {
  const year = new Date().getFullYear();
  return (
    <footer className="site-footer">
      <div className="wrap">
        <p>
          © {year} {name}. {location}.
        </p>
        <a href="#top">Back to top</a>
      </div>
    </footer>
  );
}
