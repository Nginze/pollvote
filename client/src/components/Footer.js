import React from 'react'
import '../css/Footer.css'

export default function () {
  return (
      <footer id= 'footer'>
        <div className='footer-container'>
            <p> Created by Jonathan Kuug. © 2022 </p>
            <a href='https://github.com/Nginze'><span className='github-icon-footer'><i className="fa-brands fa-github"></i></span></a>
            <a href='https://twitter.com/JonathanKuug'><span className='github-icon-footer'><i className="fa-brands fa-twitter"></i></span></a>
        </div>
      </footer>
  )
}