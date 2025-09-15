import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Home(){
  const [rides, setRides] = useState([]);
  const [filters, setFilters] = useState({ from:'Cairo', to:'Alexandria', date:'' });
  const [booking, setBooking] = useState({ rideId:'', passengerName:'', passengerPhone:'', seatsBooked:1, paymentMethod:'cash' });

  useEffect(()=> { fetchRides(); }, []);
  async function fetchRides(){
    try{
      const res = await axios.get((process.env.NEXT_PUBLIC_API_URL||'http://localhost:5000') + '/api/rides', { params: filters });
      setRides(res.data);
    }catch(e){ console.error(e); }
  }

  async function createBooking(e){
    e.preventDefault();
    try{
      await axios.post((process.env.NEXT_PUBLIC_API_URL||'http://localhost:5000') + '/api/bookings', booking);
      alert('Booking successful!');
    }catch(err){ alert('Error: ' + err.response?.data?.error || err.message); }
  }

  return (
    <div style={{maxWidth:900, margin:'20px auto', padding:16}}>
      <h1 style={{textAlign:'center'}}>Tawsela - حجز الميكروباص</h1>
      <section style={{marginTop:20}}>
        <h3>ابحث عن رحلة</h3>
        <select value={filters.from} onChange={e=>setFilters({...filters, from:e.target.value})}>
          <option value="Cairo">القاهرة</option><option value="Giza">الجيزة</option><option value="Alexandria">الاسكندرية</option>
        </select>
        <select value={filters.to} onChange={e=>setFilters({...filters, to:e.target.value})}>
          <option value="Alexandria">الاسكندرية</option><option value="Cairo">القاهرة</option><option value="Giza">الجيزة</option>
        </select>
        <input type="date" onChange={e=>setFilters({...filters, date:e.target.value})} />
        <button onClick={fetchRides}>بحث</button>
      </section>

      <section style={{marginTop:20}}>
        <h3>الرحلات المتاحة</h3>
        {rides.length===0 && <p>لا توجد رحلات حاليا</p>}
        {rides.map(r=>(
          <div key={r._id} style={{border:'1px solid #ddd', padding:12, marginBottom:10}}>
            <strong>{r.from} ➜ {r.to}</strong>
            <p>date: {new Date(r.date).toLocaleString()}</p>
            <p>Seats left: {r.seatsLeft} | Price: {r.pricePerSeat} EGP</p>
            <button onClick={()=> setBooking({...booking, rideId:r._id})}>اختر</button>
          </div>
        ))}
      </section>

      <section style={{marginTop:20}}>
        <h3>نموذج الحجز</h3>
        <form onSubmit={createBooking}>
          <input placeholder="الاسم" required value={booking.passengerName} onChange={e=>setBooking({...booking, passengerName:e.target.value})} />
          <input placeholder="رقم الهاتف" required value={booking.passengerPhone} onChange={e=>setBooking({...booking, passengerPhone:e.target.value})} />
          <input type="number" min="1" value={booking.seatsBooked} onChange={e=>setBooking({...booking, seatsBooked: Number(e.target.value)})} />
          <select value={booking.paymentMethod} onChange={e=>setBooking({...booking, paymentMethod:e.target.value})}>
            <option value="cash">كاش</option>
            <option value="instapay">InstaPay</option>
          </select>
          <button type="submit">احجز</button>
        </form>
      </section>
    </div>
  );
}
