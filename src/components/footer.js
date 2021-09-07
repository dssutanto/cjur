import React from "react"
import { Link } from "gatsby"
// import parse from "html-react-parser"
import emailjs from "emailjs-com"
import whiteBlock from "../../content/assets/cjur-block-white.png"
import { FaFacebookF, FaLinkedinIn, FaTwitter, FaRegMap } from "react-icons/fa"

const Footer = () => {
  // const { wpUser } = useStaticQuery(graphql`
  //   query footerQuery {
  //     wpUser(id: {eq: "dXNlcjox"}) {
  //       email
  //     }
  //   }
  // `)

  // const cjurMail = wpUser.email
  // console.log(cjurMail)

  const onSubmit = (e) => {
    e.preventDefault()

    emailjs.sendForm(
      'service_sjxknjq',
      'template_gc7hdvi',
      e.target,
      'user_kWAsvZPJbU0QNg2NJlLNI'
    ).then(result => {
      alert('Email sent', result.text)
    },
    error => {
      alert('Error occurred', error.text)
    })
  }

  return (
    <footer className="global-footer">
      <div className="footer-bg-content">
        <div className="footer-wrapper">
          <div className="footer-card">
            <Link to="/"><img src={whiteBlock} alt="" className="footer-logo" /></Link>
            <h3><i>A student-led publication that aims to highlight research by undergraduate students of all disciplines</i></h3>
          </div>
          <ul className="footer-connect">
            <h4>Connect with us</h4>
            <li className="contact-info" key="address">
              <a href="https://www.google.com/maps/search/Undergraduate+Research+Opportunities+University+of+British+Columbia+6133+University+Blvd+Vancouver+BC+V6T+1Z1/">
                Undergraduate Research Opportunities<br />
                University of British Columbia<br />
                6133 University Blvd<br />
                Vancouver BC V6T 1Z1
              </a>
            </li>
            <li className="contact-info" key="facebook">
              <a href="https://www.facebook.com/cjuresearch">Facebook</a>
            </li>
            <li className="contact-info" key="twitter">
              <a href="https://twitter.com/cjuresearch">Twitter</a>
            </li>
            <li className="contact-info" key="linkedin">
              <a href="https://www.linkedin.com/company/canadian-journal-of-undergraduate-research/">LinkedIn</a>
            </li>
          </ul>
          <ul className="footer-connect provisional" style={{ display: "none" }}>
            <h4>Connect with us</h4>
            <li className="contact-info" key="address">
              <a href="https://www.google.com/maps/search/Undergraduate+Research+Opportunities+University+of+British+Columbia+6133+University+Blvd+Vancouver+BC+V6T+1Z1/">
                <FaRegMap />
              </a>
            </li>
            <li className="contact-info" key="facebook">
              <a href="https://www.facebook.com/cjuresearch"><FaFacebookF /></a>
            </li>
            <li className="contact-info" key="twitter">
              <a href="https://twitter.com/cjuresearch"><FaTwitter /></a>
            </li>
            <li className="contact-info" key="linkedin">
              <a href="https://www.linkedin.com/company/canadian-journal-of-undergraduate-research/"><FaLinkedinIn /></a>
            </li>
          </ul>
          <form className="footer-contact" onSubmit={onSubmit}>
            <h4>Get in touch</h4>
            <section>
              <label htmlFor="name">Name</label>
              <input type="text" name="name"></input>
            </section>
            <section>
              <label htmlFor="email">E-mail address</label>
              <input type="text" name="email"></input>
            </section>
            <section>
              <label htmlFor="message">Message</label>
              <textarea name="message"></textarea>
            </section>
            <input type="submit" value="Verify &amp; Submit &rarr;" />
          </form>
        </div>
      </div>
      <div className="footer-bg-credits">
        <div className="footer-wrapper">
          <span>Copyright © Canadian Journal of Undergraduate Research {new Date().getFullYear()} | Site design and logo by <a href="https://sutanto.dev/"> Derrick Sutanto</a></span>
        </div>
      </div>
      <div className="footer-bg-credits provisional" style={{ display: "none" }}>
        <div className="footer-wrapper">
          <span>© CJUR | Logo and website by <a href="https://sutanto.dev/"> Derrick Sutanto</a></span>
        </div>
      </div>
    </footer>
  )
}

export default Footer
