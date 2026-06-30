/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginScreen from './screens/LoginScreen';
import ResourcesScreen from './screens/ResourcesScreen';
import AboutScreen from './screens/AboutScreen';
import AccountScreen from './screens/AccountScreen';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginScreen />} />
        <Route path="/app" element={<ResourcesScreen />} />
        <Route path="/about" element={<AboutScreen />} />
        <Route path="/account" element={<AccountScreen />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}
