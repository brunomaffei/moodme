import React from 'react'
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom'

import MakeUP from '../components/makeUp'


// Countries
import {BELGIUM, BRAZIL, FRANCE, PORTUGAL} from '../utils/countries'


export default function Home(){
  return (
<Router>
      <Switch>
      <Route path="/">
          <div>
          <MakeUP/>
          </div>
        </Route>
        <Route path="/brazil">
          <div>
          <MakeUP countries={[BRAZIL]}/>
          </div>
        </Route>
        <Route path="/belgium">
          <div>
          <MakeUP countries={[BELGIUM]}/>
          </div>
        </Route>
        <Route path="/france">
          <div>
          <MakeUP countries={[FRANCE]}/>
          </div>
        </Route>
        <Route path="/portugal">
          <div>
          <MakeUP countries={[PORTUGAL]}/>
          </div>
        </Route>
      </Switch>
    </Router>
  )
}