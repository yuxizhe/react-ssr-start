import React from 'react'
import { NavLink } from 'react-router-dom'

export default function Navbar() {
  const languages = [
    // {
    //   name: '全部',
    //   param: ''
    // },
    {
      name: '经理言论',
      param: 'MANAGER_SPEECH'
    },
    {
      name: '投研报告',
      param: 'RESEARCH_REPORT'
    },
    {
      name: '经理采访',
      param: 'PRIVATE_INTERVIEW'
    }
  ]

  return (
    <ul>
      {languages.map(({ name, param }) => (
        <li key={param}>
          <NavLink
            activeStyle={{ fontWeight: 'bold' }}
            to={`/popular/${param}`}
          >
            {name}
          </NavLink>
        </li>
      ))}
    </ul>
  )
}
