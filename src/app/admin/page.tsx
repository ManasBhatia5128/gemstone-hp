'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import {
  Search,
  Filter,
  RefreshCw,
  CheckCircle,
  Clock,
  XCircle,
  CreditCard,
  Phone,
  Calendar,
  MapPin,
  User,
  ChevronDown,
  IndianRupee,
  AlertCircle,
  Loader2,
  LogOut
} from 'lucide-react';

const LOGO_URL = 'https://customer-assets.emergentagent.com/job_humara-pandit/artifacts/zuqvly06_hplogo.png';

interface Booking {
  _id: string;
  name: string;
  phone: string;
  birth_date: string;
  birth_time?: string | null;
  birth_place: string;
  problem?: string | null;
  status: 'pending' | 'paid' | 'confirmed' | 'completed' | 'cancelled';
  payment_id?: string | null;
  created_at: string;
  updated_at: string;
}

interface PaymentStatus {
  status: string;
  booking_id: string;
  razorpay_order_id?: string;
  razorpay_payment_id?: string | null;
  amount?: number;
  paid_at?: string | null;
}

const statusConfig: Record<string, { label: string; color: string; icon: React.ElementType }> = {
  pending: { label: 'Pending', color: 'bg-[#FEEFDC] text-[#BCA182]', icon: Clock },
  paid: { label: 'Paid', color: 'bg-[#b8d1ba] text-[#4a7c59]', icon: CreditCard },
  confirmed: { label: 'Confirmed', color: 'bg-[#E4EDF8] text-[#768597]', icon: CheckCircle },
  completed: { label: 'Completed', color: 'bg-[#b8d1ba] text-[#4a7c59]', icon: CheckCircle },
  cancelled: { label: 'Cancelled', color: 'bg-[#FCC9C7] text-[#dc2626]', icon: XCircle }
};

export default function AdminDashboard() {
  const router = useRouter();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [filteredBookings, setFilteredBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [updatingStatus, setUpdatingStatus] = useState<string | null>(null);
  const [paymentStatuses, setPaymentStatuses] = useState<Record<string, PaymentStatus>>({});

  const fetchBookings = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/bookings');
      if (!response.ok) throw new Error('Failed to fetch bookings');
      
      const data = await response.json();
      const sortedBookings = data.sort(
        (a: Booking, b: Booking) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
      setBookings(sortedBookings);
      setFilteredBookings(sortedBookings);

      const paymentPromises = sortedBookings.map(async (booking: Booking) => {
        try {
          const paymentRes = await fetch(`/api/payments/status/${booking._id}`);
          const paymentData = await paymentRes.json();
          return { bookingId: booking._id, ...paymentData };
        } catch {
          return { bookingId: booking._id, status: 'not_initiated' };
        }
      });

      const payments = await Promise.all(paymentPromises);
      const paymentMap: Record<string, PaymentStatus> = {};
      payments.forEach((p) => {
        paymentMap[p.bookingId] = p;
      });
      setPaymentStatuses(paymentMap);
    } catch (err) {
      console.error('Error fetching bookings:', err);
      setError('Failed to load bookings. Please try again.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBookings();
  }, [fetchBookings]);

  useEffect(() => {
    let filtered = bookings;

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (b) =>
          b.name.toLowerCase().includes(term) ||
          b.phone.includes(term) ||
          b.birth_place.toLowerCase().includes(term) ||
          b._id.toLowerCase().includes(term)
      );
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter((b) => b.status === statusFilter);
    }

    setFilteredBookings(filtered);
  }, [searchTerm, statusFilter, bookings]);

  const updateStatus = async (bookingId: string, newStatus: string) => {
    setUpdatingStatus(bookingId);
    try {
      const response = await fetch(`/api/bookings/${bookingId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) throw new Error('Failed to update status');

      await fetchBookings();
      setSelectedBooking(null);
    } catch (err) {
      console.error('Error updating status:', err);
      alert('Failed to update status. Please try again.');
    } finally {
      setUpdatingStatus(null);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/auth', { method: 'DELETE' });
      router.push('/login');
      router.refresh();
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const stats = {
    total: bookings.length,
    pending: bookings.filter((b) => b.status === 'pending').length,
    paid: bookings.filter((b) => b.status === 'paid').length,
    confirmed: bookings.filter((b) => b.status === 'confirmed').length,
    completed: bookings.filter((b) => b.status === 'completed').length,
    cancelled: bookings.filter((b) => b.status === 'cancelled').length
  };

  const totalRevenue = bookings.filter((b) => b.status === 'paid' || b.status === 'confirmed' || b.status === 'completed').length * 251;

  return (
    <div className="min-h-screen bg-[#FFF9F2]">
      <header className="bg-white border-b border-[#E9E1E1] sticky top-0 z-50">
        <div className="container mx-auto px-4 md:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img 
                src={LOGO_URL} 
                alt="Humara Pandit" 
                className="h-10 w-auto"
              />
              <div>
                <h1 className="font-semibold text-lg text-[#232323]">Humara Pandit</h1>
                <p className="text-xs text-[#353535]">Admin Dashboard</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={fetchBookings}
                disabled={loading}
                className="flex items-center gap-2 px-4 py-2 bg-[#232323] text-white rounded-full text-sm font-medium hover:bg-[#353535] transition-colors disabled:opacity-50"
              >
                <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                Refresh
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 border border-[#E9E1E1] text-[#353535] rounded-full text-sm font-medium hover:bg-[#FFF9F2] transition-colors"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 md:px-8 py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-8">
          <div className="bg-white rounded-xl p-4 border border-[#E9E1E1]">
            <p className="text-xs text-[#353535] mb-1">Total Bookings</p>
            <p className="text-2xl font-semibold text-[#232323]">{stats.total}</p>
          </div>
          <div className="bg-white rounded-xl p-4 border border-[#E9E1E1]">
            <p className="text-xs text-[#353535] mb-1">Pending</p>
            <p className="text-2xl font-semibold text-[#BCA182]">{stats.pending}</p>
          </div>
          <div className="bg-white rounded-xl p-4 border border-[#E9E1E1]">
            <p className="text-xs text-[#353535] mb-1">Paid</p>
            <p className="text-2xl font-semibold text-[#4a7c59]">{stats.paid}</p>
          </div>
          <div className="bg-white rounded-xl p-4 border border-[#E9E1E1]">
            <p className="text-xs text-[#353535] mb-1">Confirmed</p>
            <p className="text-2xl font-semibold text-[#768597]">{stats.confirmed}</p>
          </div>
          <div className="bg-white rounded-xl p-4 border border-[#E9E1E1]">
            <p className="text-xs text-[#353535] mb-1">Completed</p>
            <p className="text-2xl font-semibold text-[#4a7c59]">{stats.completed}</p>
          </div>
          <div className="bg-white rounded-xl p-4 border border-[#E9E1E1]">
            <p className="text-xs text-[#353535] mb-1">Revenue</p>
            <p className="text-2xl font-semibold text-[#232323] flex items-center">
              <IndianRupee className="w-5 h-5" />{totalRevenue}
            </p>
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 border border-[#E9E1E1] mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#999999]" />
              <input
                type="text"
                placeholder="Search by name, phone, city, or ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-[#E9E1E1] rounded-xl bg-white text-[#232323] placeholder:text-[#999999] focus:border-[#4D4D4D] focus:outline-none"
              />
            </div>

            <div className="relative">
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#999999]" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="pl-10 pr-10 py-2.5 border border-[#E9E1E1] rounded-xl bg-white text-[#232323] focus:border-[#4D4D4D] focus:outline-none appearance-none cursor-pointer min-w-[160px]"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="paid">Paid</option>
                <option value="confirmed">Confirmed</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#999999] pointer-events-none" />
            </div>
          </div>
        </div>

        {error && (
          <div className="bg-[#FCC9C7] rounded-xl p-4 mb-6 flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-red-600" />
            <p className="text-red-800">{error}</p>
          </div>
        )}

        {loading && (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-[#232323]" />
          </div>
        )}

        {!loading && (
          <div className="bg-white rounded-xl border border-[#E9E1E1] overflow-hidden">
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full">
                <thead className="bg-[#FFF9F2] border-b border-[#E9E1E1]">
                  <tr>
                    <th className="text-left px-4 py-3 text-xs font-medium text-[#353535] uppercase">Customer</th>
                    <th className="text-left px-4 py-3 text-xs font-medium text-[#353535] uppercase">Birth Details</th>
                    <th className="text-left px-4 py-3 text-xs font-medium text-[#353535] uppercase">Problem</th>
                    <th className="text-left px-4 py-3 text-xs font-medium text-[#353535] uppercase">Payment</th>
                    <th className="text-left px-4 py-3 text-xs font-medium text-[#353535] uppercase">Status</th>
                    <th className="text-left px-4 py-3 text-xs font-medium text-[#353535] uppercase">Date</th>
                    <th className="text-left px-4 py-3 text-xs font-medium text-[#353535] uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E9E1E1]">
                  {filteredBookings.map((booking) => {
                    const StatusIcon = statusConfig[booking.status]?.icon || Clock;
                    const paymentInfo = paymentStatuses[booking._id];
                    
                    return (
                      <tr key={booking._id} className="hover:bg-[#FFF9F2]/50 transition-colors">
                        <td className="px-4 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-[#F9E8FA] flex items-center justify-center">
                              <User className="w-5 h-5 text-[#987D9C]" />
                            </div>
                            <div>
                              <p className="font-medium text-[#232323]">{booking.name}</p>
                              <p className="text-sm text-[#353535] flex items-center gap-1">
                                <Phone className="w-3 h-3" /> {booking.phone}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <div className="text-sm">
                            <p className="text-[#232323] flex items-center gap-1">
                              <Calendar className="w-3 h-3 text-[#999999]" /> {booking.birth_date}
                              {booking.birth_time && ` • ${booking.birth_time}`}
                            </p>
                            <p className="text-[#353535] flex items-center gap-1">
                              <MapPin className="w-3 h-3 text-[#999999]" /> {booking.birth_place}
                            </p>
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <p className="text-sm text-[#353535] max-w-[200px] truncate">
                            {booking.problem || '-'}
                          </p>
                        </td>
                        <td className="px-4 py-4">
                          {paymentInfo?.status === 'paid' || paymentInfo?.razorpay_payment_id ? (
                            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs bg-[#b8d1ba] text-[#4a7c59]">
                              <CreditCard className="w-3 h-3" /> Paid
                            </span>
                          ) : paymentInfo?.status === 'created' ? (
                            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs bg-[#FEEFDC] text-[#BCA182]">
                              <Clock className="w-3 h-3" /> Initiated
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs bg-[#E9E1E1] text-[#353535]">
                              <XCircle className="w-3 h-3" /> Not Paid
                            </span>
                          )}
                        </td>
                        <td className="px-4 py-4">
                          <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs ${statusConfig[booking.status]?.color || 'bg-gray-100'}`}>
                            <StatusIcon className="w-3 h-3" />
                            {statusConfig[booking.status]?.label || booking.status}
                          </span>
                        </td>
                        <td className="px-4 py-4">
                          <p className="text-sm text-[#353535]">{formatDate(booking.created_at)}</p>
                        </td>
                        <td className="px-4 py-4">
                          <button
                            onClick={() => setSelectedBooking(booking)}
                            className="text-sm text-[#768597] hover:text-[#232323] font-medium"
                          >
                            View / Edit
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="md:hidden divide-y divide-[#E9E1E1]">
              {filteredBookings.map((booking) => {
                const StatusIcon = statusConfig[booking.status]?.icon || Clock;
                const paymentInfo = paymentStatuses[booking._id];
                
                return (
                  <div key={booking._id} className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-[#F9E8FA] flex items-center justify-center">
                          <User className="w-5 h-5 text-[#987D9C]" />
                        </div>
                        <div>
                          <p className="font-medium text-[#232323]">{booking.name}</p>
                          <p className="text-sm text-[#353535]">{booking.phone}</p>
                        </div>
                      </div>
                      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs ${statusConfig[booking.status]?.color || 'bg-gray-100'}`}>
                        <StatusIcon className="w-3 h-3" />
                        {statusConfig[booking.status]?.label || booking.status}
                      </span>
                    </div>
                    <div className="text-sm text-[#353535] space-y-1 mb-3">
                      <p>{booking.birth_date} • {booking.birth_place}</p>
                      {booking.problem && <p className="truncate">{booking.problem}</p>}
                    </div>
                    <div className="flex items-center justify-between">
                      {paymentInfo?.status === 'paid' || paymentInfo?.razorpay_payment_id ? (
                        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs bg-[#b8d1ba] text-[#4a7c59]">
                          <CreditCard className="w-3 h-3" /> Paid
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs bg-[#E9E1E1] text-[#353535]">
                          Not Paid
                        </span>
                      )}
                      <button
                        onClick={() => setSelectedBooking(booking)}
                        className="text-sm text-[#768597] font-medium"
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {filteredBookings.length === 0 && !loading && (
              <div className="text-center py-12">
                <p className="text-[#353535]">No bookings found</p>
              </div>
            )}
          </div>
        )}
      </main>

      {selectedBooking && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-[#E9E1E1]">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-[#232323]">Booking Details</h2>
                <button
                  onClick={() => setSelectedBooking(null)}
                  className="p-2 hover:bg-[#FFF9F2] rounded-full transition-colors"
                >
                  <XCircle className="w-5 h-5 text-[#353535]" />
                </button>
              </div>
            </div>
            
            <div className="p-6 space-y-4">
              <div className="bg-[#FFF9F2] rounded-xl p-4">
                <p className="text-xs text-[#353535] uppercase mb-2">Customer</p>
                <p className="font-medium text-[#232323]">{selectedBooking.name}</p>
                <p className="text-sm text-[#353535]">{selectedBooking.phone}</p>
              </div>

              <div className="bg-[#FFF9F2] rounded-xl p-4">
                <p className="text-xs text-[#353535] uppercase mb-2">Birth Details</p>
                <p className="text-[#232323]">
                  {selectedBooking.birth_date}
                  {selectedBooking.birth_time && ` at ${selectedBooking.birth_time}`}
                </p>
                <p className="text-sm text-[#353535]">{selectedBooking.birth_place}</p>
              </div>

              {selectedBooking.problem && (
                <div className="bg-[#FFF9F2] rounded-xl p-4">
                  <p className="text-xs text-[#353535] uppercase mb-2">Problem</p>
                  <p className="text-[#232323]">{selectedBooking.problem}</p>
                </div>
              )}

              <div className="bg-[#E4EDF8] rounded-xl p-4">
                <p className="text-xs text-[#768597] uppercase mb-2">Booking ID</p>
                <p className="font-mono text-sm text-[#232323]">{selectedBooking._id}</p>
              </div>

              {paymentStatuses[selectedBooking._id]?.razorpay_payment_id && (
                <div className="bg-[#b8d1ba]/30 rounded-xl p-4">
                  <p className="text-xs text-[#4a7c59] uppercase mb-2">Payment ID</p>
                  <p className="font-mono text-sm text-[#232323]">
                    {paymentStatuses[selectedBooking._id].razorpay_payment_id}
                  </p>
                </div>
              )}

              <div>
                <p className="text-xs text-[#353535] uppercase mb-3">Update Status</p>
                <div className="flex flex-wrap gap-2">
                  {['pending', 'paid', 'confirmed', 'completed', 'cancelled'].map((status) => (
                    <button
                      key={status}
                      onClick={() => updateStatus(selectedBooking._id, status)}
                      disabled={updatingStatus === selectedBooking._id || selectedBooking.status === status}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all disabled:opacity-50 ${
                        selectedBooking.status === status
                          ? statusConfig[status]?.color
                          : 'bg-[#E9E1E1] text-[#353535] hover:bg-[#232323] hover:text-white'
                      }`}
                    >
                      {updatingStatus === selectedBooking._id ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        statusConfig[status]?.label
                      )}
                    </button>
                  ))}
                </div>
              </div>

              <p className="text-xs text-[#999999] text-center">
                Created: {formatDate(selectedBooking.created_at)}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
