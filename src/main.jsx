import React, { useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Search, CheckCircle2, Clock, AlertCircle, ArrowRight, ShieldCheck, Copy, MapPin, User, Building2, CalendarDays, ReceiptText } from 'lucide-react';
import './style.css';

const transactions = {
  MIB5446P921: {
    reference: 'MIB5446P921',
    status: 'Deposit to receiver account',
    statusType: 'pending',
    amount: 'INR 799,000.00',
    service: 'Family Support Transfer',
    sender: 'Ahmed Sivaam',
    receiver: 'Eslavath Rajesh Kumar',
    destination: 'Maldives to India',
    createdAt: '24 May 2026, 10:00 AM',
    expectedAt: '27 May 2026, 12:00 AM',
    payoutLocation: 'Deposit to Bank Account',
    senderAgent: 'Western Union Maldives',
    receiverBank: 'Indian Bank N/A',
    note: 'Funds has been received by your bank. Your bank will deposit the funds to your account',
    timeline: [
      { title: 'Transaction Created', time: '24 May 2026, 10:00 AM', done: true },
      { title: 'Documentation Processing', time: 'Completed at 24 May 2026, 04:30 PM', done: true },
      { title: 'Payment Verification', time: 'Completed at 24 May 2026, 05:40 PM', done: true },
      { title: 'International Transaction Verification', time: 'Completed at 25 May 2026, 11:20 AM', done: true },
      { title: 'Payment Processed', time: 'Completed', done: true },
      { title: "Received to Receiver's Bank", time: 'Completed', done: true },
      { title: "Deposited to Receiver's Account", time: 'In Progress', done: true, active: true }
    ]
  },
  MCTN1234567890: {
    reference: 'MCTN1234567890',
    status: 'Ready for Collection',
    statusType: 'success',
    amount: 'USD 2,500.00',
    service: 'International Money Transfer',
    sender: 'Shinaz Waheed',
    receiver: 'Shaina Waheed',
    destination: 'Madrid, Spain',
    createdAt: '24 May 2026, 10:20 AM',
    expectedAt: '24 May 2026, 02:00 PM',
    payoutLocation: 'Any authorized payout branch',
    note: 'Receiver can collect the funds after identity verification.',
    timeline: [
      { title: 'Transaction Created', time: '10:20 AM', done: true },
      { title: 'Payment Verified', time: '10:34 AM', done: true },
      { title: 'Transfer Processing', time: '11:05 AM', done: true },
      { title: 'Ready for Collection', time: '12:10 PM', done: true },
      { title: 'Collected by Receiver', time: 'Pending', done: false }
    ]
  }
};

function StatusIcon({ type }) {
  if (type === 'success') return <CheckCircle2 className="icon success" />;
  if (type === 'warning') return <AlertCircle className="icon warning" />;
  return <Clock className="icon pending" />;
}

function DetailItem({ icon: Icon, label, value }) {
  return <div className="detail-card"><div className="detail-label"><Icon size={16}/>{label}</div><p>{value}</p></div>;
}

function App() {
  const [reference, setReference] = useState('MIB5446P921');
  const [searchedRef, setSearchedRef] = useState('MIB5446P921');
  const transaction = useMemo(() => transactions[searchedRef.trim().toUpperCase()], [searchedRef]);

  const handleSearch = () => setSearchedRef(reference.trim().toUpperCase());

  return <main>
    <section className="hero">
      <div className="hero-icon"><ReceiptText /></div>
      <h1>Track Your Transaction</h1>
      <p>Enter your transaction reference number to check the latest status, payout information, and transfer timeline.</p>
      <div className="search-box">
        <div className="input-wrap"><Search size={20}/><input value={reference} onChange={(e)=>setReference(e.target.value)} onKeyDown={(e)=>e.key==='Enter'&&handleSearch()} placeholder="Enter reference number" /></div>
        <button onClick={handleSearch}>Track Now <ArrowRight size={16}/></button>
      </div>
    </section>

    {!transaction ? <section className="card not-found"><AlertCircle size={48}/><h2>Transaction Not Found</h2><p>Please check the reference number and try again.</p></section> : <section className="content">
      <div className="card status-card">
        <div><div className="status-top"><StatusIcon type={transaction.statusType}/><span>Current Status</span></div><h2>{transaction.status}</h2><p>{transaction.note}</p></div>
        <div className="reference-card"><span>Reference Number</span><strong>{transaction.reference}</strong><Copy size={16}/></div>
      </div>

      <div className="grid-four">
        <DetailItem icon={ReceiptText} label="Amount" value={transaction.amount}/>
        <DetailItem icon={ShieldCheck} label="Service" value={transaction.service}/>
        <DetailItem icon={CalendarDays} label="Expected Completion" value={transaction.expectedAt}/>
        <DetailItem icon={MapPin} label="Destination" value={transaction.destination}/>
      </div>

      <div className="main-grid">
        <div className="card"><h3>Transaction Timeline</h3><div className="timeline">{transaction.timeline.map((step,index)=><div className="timeline-row" key={step.title}><div className={step.done?'dot done':'dot'}>{step.done?<CheckCircle2 size={18}/>:<Clock size={16}/>}</div><div className="timeline-box"><b>{step.title}</b><span className={step.active?'active':''}>{step.time}</span></div></div>)}</div></div>
        <div className="side">
          <div className="card"><h3>Transfer Details</h3><DetailItem icon={User} label="Sender" value={transaction.sender}/><DetailItem icon={Building2} label="Sender Agent" value={transaction.senderAgent || 'N/A'}/><DetailItem icon={User} label="Receiver" value={transaction.receiver}/><DetailItem icon={Building2} label="Receiver Bank" value={transaction.receiverBank || 'N/A'}/><DetailItem icon={Building2} label="Payout Method" value={transaction.payoutLocation}/><DetailItem icon={CalendarDays} label="Created At" value={transaction.createdAt}/></div>
          <div className="card help"><h3>Need Help?</h3><p>Contact support with your reference number if the status has not changed within the expected time.</p><button>Contact Support</button></div>
        </div>
      </div>
    </section>}
  </main>;
}

createRoot(document.getElementById('root')).render(<App />);

