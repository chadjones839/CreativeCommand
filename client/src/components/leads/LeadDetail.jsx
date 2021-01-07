/*eslint-disable*/
import React, { useContext, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { AccountContext } from "../../providers/AccountProvider";
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


export default function AccountDetail() {
  const { account, getById } = useContext(AccountContext);
  const { campaignStatuses, getAllByCampaignAccountId } = useContext(CampaignStatusContext);
  const { id } = useParams()

  useEffect(() => {
    getById(id)
  }, []);

  function leadActions() {
    document.getElementById("leadActionsDropdown").classList.toggle("show");
  }

  function activityType() {
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

  if (!account || !campaignStatuses || !account.salesUser || !account.managerUser) {
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
                <strong>&#8592; Back</strong>
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
                  <dd>CMO, <strong>{account.company}</strong></dd>
                  <dt><Email fill=" #f7ffff" viewBox="-10 -8 35 35"/></dt>
                  <dd>jackie.welles@spacerschoice.com</dd>
                  <dt><Phone fill=" #f7ffff" viewBox="-10 -8 35 35"/></dt>
                  <dd>202.345.2341</dd>
                  <dt><Location fill=" #f7ffff" viewBox="-10 -8 35 35"/></dt>
                  <dd>{account.city} {account.state}, {account.zipCode}
                  </dd>
                </dl>
              </div>
              <div className="leadDetails__quickInfo">
                <div className="leadDetails__leadScore">
                  <div className="leadScore">
                    57
                  </div>
                  <div className="leadCategory">
                    Lead Score
                  </div>
                </div>
                <div className="leadDetails__leadScore">
                  <div className="leadScore">
                    27
                  </div>
                  <div className="leadCategory">
                    Engaged
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
                    <dd>{account.salesUser.fullName}</dd>
                    <dt>Lead Type</dt>
                    <dd>Cold</dd>
                    <dt>Lead Source</dt>
                    <dd>AdAge</dd>
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
                <button className="link"><span>Lead Details</span></button>    
                <button className="link"><span>Tasks</span></button>    
                <button className="link"><span>Notes</span></button>    
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
                          <i>12:45 PM</i>
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
                          <i>12:45 PM</i>
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
                        <h3 className="positiveScore">+10</h3>
                      </div>
                    </div>
                    

                  </div>
                  <h4>Nov 2020</h4>
                  <div className="lastMonthsActivity">

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