import './unique.css';
import { HashLink } from 'react-router-hash-link';
import { Link } from 'react-router-dom';
import pic02 from '../../../assets/pic02.jpg'

function Header() {
  return (
    <header id="header">
      <h1 id="logo">
        <Link to={'/home'}>AlkyBank</Link>
      </h1>
      <nav id="nav">
        <ul>
          <li>
            <Link to={'/login'} className="button primary">
              Ingresar
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

function Banner() {
  return (
    <section id="banner">
      <div className="content">
        <header>
          <h2>Sumate a la revolucion bancaria</h2>
          <p>
            Tu dinero siempre con vos.
            <br />
            Estes donde estes.
          </p>
        </header>
        <span className="image">
          <img
            src="https://images.unsplash.com/photo-1601597111158-2fceff292cdc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
            alt=""
          />
        </span>
      </div>
      <HashLink smooth to="#one" className="gotoNext">
        Next
      </HashLink>
    </section>
  );
}

function Footer() {
  return (
    <footer id="footer">
      <ul className="icons">
        <li>
          <i className="icon fa-brands alt fa-twitter">
            <span className="label">Twitter</span>
          </i>
        </li>
        <li>
          <a
            href="src/components/pages/landing/index.jsx#"
            className="icon brands alt fa-facebook-f">
            <span className="label">Facebook</span>
          </a>
        </li>
        <li>
          <a
            href="src/components/pages/landing/index.jsx#"
            className="icon brands alt fa-linkedin-in">
            <span className="label">LinkedIn</span>
          </a>
        </li>
        <li>
          <a
            href="src/components/pages/landing/index.jsx#"
            className="icon brands alt fa-instagram">
            <span className="label">Instagram</span>
          </a>
        </li>
        <li>
          <a href="src/components/pages/landing/index.jsx#" className="icon brands alt fa-github">
            <span className="label">GitHub</span>
          </a>
        </li>
        <li>
          <a href="src/components/pages/landing/index.jsx#" className="icon solid alt fa-envelope">
            <span className="label">Email</span>
          </a>
        </li>
      </ul>
      <ul className="copyright">
        <li>&copy; Untitled. All rights reserved.</li>
        <li>
          Design: <a href="http://html5up.net">HTML5 UP</a>
        </li>
      </ul>
    </footer>
  );
}

function Landing() {
  return (
    <div id="page-wrapper" className="fakebody">
      <Header />
      <Banner />
      <section id="one" className="spotlight style1 bottom bg-one bg-oneUrl">
        <span className="image fit main">
          <img src={pic02} alt="" />
        </span>
        <div className="content">
          <div className="container-unique">
            <div className="row">
              <div className="col4 col12medium">
                <header>
                  <h2>Odio faucibus ipsum integer consequat</h2>
                  <p>Nascetur eu nibh vestibulum amet gravida nascetur praesent</p>
                </header>
              </div>
              <div className="col4 col12medium">
                <p>
                  Feugiat accumsan lorem eu ac lorem amet sed accumsan donec. Blandit orci porttitor
                  semper. Arcu phasellus tortor enim mi nisi praesent dolor adipiscing. Integer mi
                  sed nascetur cep aliquet augue varius tempus lobortis porttitor accumsan consequat
                  adipiscing lorem dolor.
                </p>
              </div>
              <div className="col4 col12medium">
                <p>
                  Morbi enim nascetur et placerat lorem sed iaculis neque ante adipiscing adipiscing
                  metus massa. Blandit orci porttitor semper. Arcu phasellus tortor enim mi mi nisi
                  praesent adipiscing. Integer mi sed nascetur cep aliquet augue varius tempus.
                  Feugiat lorem ipsum dolor nullam.
                </p>
              </div>
            </div>
          </div>
        </div>
        <HashLink smooth to="#two" className="gotoNext">
          Next
        </HashLink>
      </section>

      <section id="two" className="spotlight style2 right bg-two bg-twoUrl">
        <span className="image fit main">
          <img
            src="https://images.unsplash.com/photo-1634224147987-95d2b7679fb0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1974&q=80"
            alt=""
          />
        </span>
        <div className="content">
          <header>
            <h2>Interdum amet non magna accumsan</h2>
            <p>Nunc commodo accumsan eget id nisi eu col volutpat magna</p>
          </header>
          <p>
            Feugiat accumsan lorem eu ac lorem amet ac arcu phasellus tortor enim mi mi nisi
            praesent adipiscing. Integer mi sed nascetur cep aliquet augue varius tempus lobortis
            porttitor lorem et accumsan consequat adipiscing lorem.
          </p>
          <ul className="actions">
            <li>
              <a href="src/components/pages/landing/index.jsx#" className="button">
                Learn More
              </a>
            </li>
          </ul>
        </div>
        <HashLink smooth to="#three" className="gotoNext">
          Next
        </HashLink>
      </section>

      <section id="three" className="spotlight style3 left bg-three bg-threeUrl">
        <span className="image git main bottom">
          <img
            src="https://images.unsplash.com/photo-1553729459-efe14ef6055d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
            alt=""
          />
        </span>
        <div className="content">
          <header>
            <h2>Interdum felis blandit praesent sed augue</h2>
            <p>Accumsan integer ultricies aliquam vel massa sapien phasellus</p>
          </header>
          <p>
            Feugiat accumsan lorem eu ac lorem amet ac arcu phasellus tortor enim mi mi nisi
            praesent adipiscing. Integer mi sed nascetur cep aliquet augue varius tempus lobortis
            porttitor lorem et accumsan consequat adipiscing lorem.
          </p>
          <ul className="actions">
            <li>
              <a href="src/components/pages/landing/index.jsx#" className="button">
                Learn More
              </a>
            </li>
          </ul>
        </div>
        <HashLink smooth to="#four" className="gotoNext">
          Next
        </HashLink>
      </section>

      <section id="four" className="wrapper style1 special fade-up">
        <div className="container-unique">
          <header className="major">
            <h2>Accumsan sed tempus adipiscing blandit</h2>
            <p>Iaculis ac volutpat vis non enim gravida nisi faucibus posuere arcu consequat</p>
          </header>
          <div className="box alt">
            <div className="row gtr-uniform">
              <section className="col4 col-6-medium col-12-xsmall">
                <span className="icon alt major solid fa-area-chart"></span>
                <h3>Ipsum sed commodo</h3>
                <p>
                  Feugiat accumsan lorem eu ac lorem amet accumsan donec. Blandit orci porttitor.
                </p>
              </section>
              <section className="col4 col-6-medium col-12-xsmall">
                <span className="icon alt major solid fa-comment"></span>
                <h3>Eleifend lorem ornare</h3>
                <p>
                  Feugiat accumsan lorem eu ac lorem amet accumsan donec. Blandit orci porttitor.
                </p>
              </section>
              <section className="col4 col-6-medium col-12-xsmall">
                <span className="icon alt major solid fa-flask"></span>
                <h3>Cubilia cep lobortis</h3>
                <p>
                  Feugiat accumsan lorem eu ac lorem amet accumsan donec. Blandit orci porttitor.
                </p>
              </section>
              <section className="col4 col-6-medium col-12-xsmall">
                <span className="icon alt major solid fa-paper-plane"></span>
                <h3>Non semper interdum</h3>
                <p>
                  Feugiat accumsan lorem eu ac lorem amet accumsan donec. Blandit orci porttitor.
                </p>
              </section>
              <section className="col4 col-6-medium col-12-xsmall">
                <span className="icon alt major solid fa-file"></span>
                <h3>Odio laoreet accumsan</h3>
                <p>
                  Feugiat accumsan lorem eu ac lorem amet accumsan donec. Blandit orci porttitor.
                </p>
              </section>
              <section className="col4 col-6-medium col-12-xsmall">
                <span className="icon alt major solid fa-lock"></span>
                <h3>Massa arcu accumsan</h3>
                <p>
                  Feugiat accumsan lorem eu ac lorem amet accumsan donec. Blandit orci porttitor.
                </p>
              </section>
            </div>
          </div>
          <footer className="major">
            <ul className="actions special">
              <li>
                <a href="src/components/pages/landing/index.jsx#" className="button">
                  Magna sed feugiat
                </a>
              </li>
            </ul>
          </footer>
        </div>
      </section>

      <section id="five" className="wrapper style2 special fade">
        <div className="container-unique">
          <header>
            <h2>Magna faucibus lorem diam</h2>
            <p>Ante metus praesent faucibus ante integer id accumsan eleifend</p>
          </header>
          <form method="post" action="src/components/pages/landing/index.jsx#" className="cta">
            <div className="row gtr-uniform gtr-50">
              <div className="col-8 col-12-xsmall">
                <input type="email" name="email" id="email" placeholder="Your Email Address" />
              </div>
              <div className="col4 col-12-xsmall">
                <input type="submit" value="Get Started" className="fit primary" />
              </div>
            </div>
          </form>
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default Landing;
