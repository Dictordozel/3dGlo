'use strict';
import "@babel/polyfill";
import 'nodelist-foreach-polyfill';
import elementClosest from 'element-closest';
    elementClosest(window);
import 'formdata-polyfill';
import 'es6-promise';
import 'fetch-polyfill';
import 'remove-polyfill';
    
import countTimer from './modules/countTimer';
import toggleMenu from './modules/toggleMenu';
import togglePopUp from './modules/togglePopUp';
import tabs from './modules/tabs';
import slider from './modules/slider';
import command from './modules/command';
import validCalcValue from './modules/validCalcValue';
import calc from './modules/calc';
import sendForm from './modules/sendForm';


    countTimer();
     
    toggleMenu();
    
    togglePopUp();
    
    tabs();
   
    slider();
    
    command();
    
    validCalcValue();
  
    calc();
  
    sendForm();