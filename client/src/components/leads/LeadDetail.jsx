/*eslint-disable*/
import React, { useContext, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { AccountContext } from "../../providers/AccountProvider";
import { ContactContext } from "../../providers/ContactsProvider";
import { CampaignStatusContext } from "../../providers/CampaignStatusProvider";
import Location from '../../Icons/Location.js'
import Email from '../../Icons/Email.js'
import Company from '../../Icons/Company.js'
import Phone from '../../Icons/Phone.js'
import Star from '../../Icons/Star.js'
import Note from '../../Icons/Note.js'
import Activity from '../../Icons/Activity.js'
import Task from '../../Icons/Task.js'
import EmailOutline from '../../Icons/EmailOutline.js'
import DropArrow from '../../Icons/DropArrow.js'
import Pulse from '../../Icons/Pulse.js'
import EmailCircle from '../../Icons/EmailCircle.js'
import NoteActivity from '../../Icons/NoteActivity.js'
import BackArrow from '../../Icons/BackArrow.js'


export default function AccountDetail() {
  const { contact, getByAccountId } = useContext(ContactContext);
  const { account, getById } = useContext(AccountContext);

  const { id } = useParams()

  useEffect(() => {
    getById(id)
    getByAccountId(id)
  }, []);

  function phoneFormat(phoneNumberString) {
    var cleaned = ('' + phoneNumberString).replace(/\D/g, '')
    var match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/)
    if (match) {
      return match[1] + '.' + match[2] + '.' + match[3]
    }
    return null
  }

  function leadActions() {
    document.getElementById("leadActionsDropdown").classList.toggle("show");
  }

  window.onclick = function(event) {
    if (!event.target.matches('.leadActionsBtn')) {
      var dropdowns = document.getElementsByClassName("dropdown-content");
      var i;
      for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
          openDropdown.classList.remove('show');
        }
      }
    }
  }

  if (!contact || !contact.account) {
    return null
  }

  return (
    <>
      <main className="leadContainer">
        <div className="leadHeader">
          <div className="leadHeader__container">
            <div className="leadHeader__title">
              <h3>Lead Details</h3>
            </div>
            <div className="leadSecondaryHeader">
              <button className="lead-backBtn">
                <BackArrow width={15} height={15} fill="#f7f7f7" viewBox="0 0 30 30" /><strong> Back</strong>
              </button>
              <hr className="spacerBar">
              </hr>
            </div>
          </div>
        </div>
        <div className="lead__detail">
          
          <section className="leadContainer__left">
            <div className="leadDetails">
              <div className="leadDetails__contact">
                <dl className="leadDetails__contactInfo">
                  <dt><Star fill=" #f7ffff" viewBox="-10 -10 35 35"/></dt>
                  <dd><h3><strong>Jackie Welles</strong></h3></dd>
                  <dt><Company fill=" #f7ffff" viewBox="-10 -8 35 35"/></dt>
                  <dd>{contact.title}, <strong>{contact.account.company}</strong></dd>
                  <dt><Email fill=" #f7ffff" viewBox="-10 -8 35 35"/></dt>
                  <dd>{contact.email}</dd>
                  <dt><Phone fill=" #f7ffff" viewBox="-10 -8 35 35"/></dt>
                  <dd><i>o.</i> &nbsp;{phoneFormat(contact.officePhone)} <br/> <i>m.</i> {phoneFormat(contact.cellPhone)}</dd>
                  <dt><Location fill=" #f7ffff" viewBox="-10 -8 35 35"/></dt>
                  <dd>{contact.account.address} <br/> {contact.account.city} {contact.account.state}, {contact.account.zipCode}
                  </dd>
                </dl>
              </div>
              <div className="leadDetails__quickInfo">
                <div className="leadDetails__leadScore">
                  <div className="leadScore">
                    40
                  </div>
                  <div className="leadCategory">
                    Lead Score
                  </div>
                </div>
                <div className="leadDetails__leadScore">
                  <div className="leadScore">
                    0 days
                  </div>
                  <div className="leadCategory">
                    Last Activity
                  </div>
                </div>
                <div className="leadDetails__leadScore">
                  <div className="leadScore">
                    6/10
                  </div>
                  <div className="leadCategory">
                    Lead Quality
                  </div>
                </div>
              </div>
            </div>
            <div className="leadProperties">
              <div className="leadProperties__header">
                <h4>Lead Properties</h4>
              </div>
              <div className="leadProperties__details">
                <dl className="leadProperties__list">
                    <dt>Lead Owner</dt>
                    <dd>{contact.account.salesUser.fullName}</dd>
                    <dt>Lead Type</dt>
                    <dd>Warm</dd>
                    <dt>Lead Source</dt>
                    <dd>Networking Event</dd>
                    <dt>Closure Prediction</dt>
                    <dd>Low</dd>
                    <dt>Expected Revenue</dt>
                    <dd>$1,034,000</dd>
                    <dt>Lead Age</dt>
                    <dd>33 days</dd>
                    <dt>Industry</dt>
                    <dd>Junk Dealers</dd>
                  </dl>
              </div>
            </div>
            <div className="tags">

            </div>
          </section>
          <section className="leadContainer__right">
            <div className="leadActivity">
              <div className="leadActivity-buttons">
                <button className="leadActivityBtn addActivity">
                  <Activity width={18} height={18} fill="#333333" viewBox="0 0 30 30"/>Activity
                </button>
                <button className="leadActivityBtn addNote">
                  <Note width={18} height={18} fill="#333333" viewBox="0 0 30 30"/>Note
                </button>
                <button className="leadActivityBtn addTask">
                  <Task width={18} height={18} fill="#333333" viewBox="0 0 30 30"/>Task
                </button>
              </div>
              <div className="leadActions">
                <div className="leadActions__sendEmail">
                  <button className="sendEmailBtn">
                    <EmailOutline width={18} height={18} fill="#333333" viewBox="0 0 30 30"/>Send Email
                  </button>
                </div>



                <div className="leadActions__options">
                  <button onClick={leadActions} className="leadActionsBtn">
                    Lead Actions &nbsp;&nbsp; <DropArrow width={18} height={18} fill="#f7ffff" viewBox="0 -6 40 40"/>
                  </button>
                  <div id="leadActionsDropdown" className="dropdown-content">
                    <a href="#"><strong>Convert to Account</strong></a>
                    <a href="#">Edit</a>
                    <a href="#">Delete</a>
                  </div>
                </div>

              </div>
            </div>
            <div className="activityContainer">
              <div className="activityButtons">
              <div className="link-pad">&nbsp;</div>
                <button className="link active"><span>Activity History</span></button>
                <button className="link"><span>Proposals</span></button>    
                <button className="link"><span>Notes</span></button>    
                <button className="link"><span>Tasks</span></button>    
              <div className="link-pad">&nbsp;</div>
              </div>
              <div className="activityFilters">
                <div className="activityFilters__type">
                  <p className="activityFilters__type__label">Activity Type</p>
                  <select
                    id="activities-filter"
                    type="select"
                    name="activities-filter"
                    defaultValue="All Selected">
                      <option selected>All Selected</option>
                      <option>Sales Activties</option>
                      <option>Notes</option>
                      <option>Tasks</option>
                  </select>
                </div>
                <div className="activityFilters__time">
                  <p className="timeFilters__type__label">Time</p>
                  <select
                    id="time-filter"
                    type="select"
                    name="time-filter"
                    defaultValue="All Selected">
                      <option selected>All Time</option>
                      <option>Past Day</option>
                      <option>Past Week</option>
                      <option>Past Month</option>
                  </select>
                </div>
              </div>
              <div className="activityLogContainer">
                <div className="activityLog">
                  <h4>Today</h4>
                  <div className="todaysActivity">


                  <div className="loggedActivity">
                      <div className="activityDateTime__container">
                        <div className="activityDateTime">
                          <p>12 Dec</p>
                          <i>10:12 AM</i>
                        </div>
                      </div>
                      <div className="activityDescription">
                        <div className="activityIcon">
                          <EmailCircle width={24} height={24} fill="#333333" viewBox="0 -2 30 30"/>
                        </div>
                        <div className="activityDetails">
                          Sent Email with subject: "<span className="actionTitle">Today's Presentation/Digital Copy</span>"
                        </div>
                      </div>
                      <div className="activityScore">
                        <h3 className="neutralScore">+0</h3>
                      </div>
                    </div>


                    <div className="loggedActivity">
                      <div className="activityDateTime__container">
                        <div className="activityDateTime">
                          <p>12 Dec</p>
                          <i>07:36 AM</i>
                        </div>
                      </div>
                      <div className="activityDescription">
                        <div className="activityIcon">
                          <Pulse width={24} height={24} fill="#333333" viewBox="0 -2 30 30"/>
                        </div>
                        <div className="activityDetails">
                          Presented marketing plan "<span className="actionTitle">It's not the best choice, it's Spacer's Choice</span>"
                        </div>
                      </div>
                      <div className="activityScore">
                        <h3 className="positiveScore">+20</h3>
                      </div>
                    </div>


                  </div>
                  <h4>Dec 2020</h4>
                  <div className="thisMonthsActivity">

                  <div className="loggedActivity">
                      <div className="activityDateTime__container">
                        <div className="activityDateTime">
                          <p>07 Dec</p>
                          <i>2:18 PM</i>
                        </div>
                      </div>
                      <div className="activityDescription">
                        <div className="activityIcon">
                          <Pulse width={24} height={24} fill="#333333" viewBox="0 -2 30 30"/>
                        </div>
                        <div className="activityDetails">
                          <span className="actionTitle">Set Demo Meeting</span>: presenting marketing plan "<span className="actionTitle">It's not the best choice, it's Spacer's Choice</span>" on Dec 12, 2020.
                        </div>
                      </div>
                      <div className="activityScore">
                        <h3 className="positiveScore">+10</h3>
                      </div>
                    </div>

                    <div className="loggedActivity">
                      <div className="activityDateTime__container">
                        <div className="activityDateTime">
                          <p>04 Dec</p>
                          <i>1:45 PM</i>
                        </div>
                      </div>
                      <div className="activityDescription">
                        <div className="activityIcon">
                          <NoteActivity width={24} height={24} fill="#333333" viewBox="0 -2 30 30"/>
                        </div>
                        <div className="activityDetails">
                          <span className="actionTitle">Call</span>: Jackie was out. Spoke with Jan the receptionist about her holiday plans. She's visiting family in the city next week.
                        </div>
                      </div>
                      <div className="activityScore">
                        <h3 className="neutralScore">+0</h3>
                      </div>
                    </div>
                    

                  </div>
                  <h4>Nov 2020</h4>
                  <div className="lastMonthsActivity">

                  <div className="loggedActivity">
                    <div className="activityDateTime__container">
                      <div className="activityDateTime">
                        <p>09 Nov</p>
                        <i>07:28 AM</i>
                      </div>
                    </div>
                    <div className="activityDescription">
                      <div className="activityIcon">
                        <Pulse width={24} height={24} fill="#333333" viewBox="0 -2 30 30"/>
                      </div>
                      <div className="activityDetails">
                        <span className="actionTitle">Note</span>: Met Jackie Welles at a networking event, exchanged cards. Said to call next month.
                      </div>
                    </div>
                    <div className="activityScore">
                      <h3 className="positiveScore">+5</h3>
                    </div>
                  </div>
              

                  <div className="loggedActivity">
                      <div className="activityDateTime__container">
                        <div className="activityDateTime">
                          <p>09 Nov</p>
                          <i>07:23 AM</i>
                        </div>
                      </div>
                      <div className="activityDescription">
                        <div className="activityIcon">
                          <Pulse width={24} height={24} fill="#333333" viewBox="0 -2 30 30"/>
                        </div>
                        <div className="activityDetails">
                          <span className="actionTitle">Lead Created</span> by Bill Brasky
                        </div>
                      </div>
                      <div className="activityScore">
                        <h3 className="positiveScore">+5</h3>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  )
}