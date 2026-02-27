import type { Translations } from '../types';

export const translations: Translations = {
  // Header
  app_title: { en: "Rail Sahayata", hi: "रेल सहायता" },
  back: { en: "Back", hi: "वापस" },

  // Dashboard
  dashboard_title: { en: "Main Dashboard", hi: "मुख्य डैशबोर्ड" },
  complaint_title: { en: "Raise a Complaint", hi: "शिकायत दर्ज करें" },
  complaint_desc: { en: "Report issues and get help", hi: "समस्याओं की रिपोर्ट करें और सहायता प्राप्त करें" },
  waiting_hall_title: { en: "Waiting Hall Booking", hi: "प्रतीक्षालय बुकिंग" },
  waiting_hall_desc: { en: "Book a seat in the waiting hall", hi: "प्रतीक्षालय में एक सीट बुक करें" },
  train_info_title: { en: "Live Train & Platform Info", hi: "लाइव ट्रेन और प्लेटफार्म जानकारी" },
  train_info_desc: { en: "Track your train in real-time", hi: "वास्तविक समय में अपनी ट्रेन को ट्रैक करें" },
  transport_title: { en: "Post Train Booking", hi: "ट्रेन के बाद बुकिंग" },
  transport_desc: { en: "Book Auto/Rickshaw/Bike", hi: "ऑटो/रिक्शा/बाइक बुक करें" },
  alert_title: { en: "Arrival Alert System", hi: "आगमन अलर्ट सिस्टम" },
  alert_desc: { en: "Get an alert before your station", hi: "अपने स्टेशन से पहले एक अलर्ट प्राप्त करें" },
  lost_found_title: { en: "Lost & Found", hi: "खोया और पाया" },
  lost_found_desc: { en: "Report or find lost items", hi: "खोई हुई वस्तुओं की रिपोर्ट करें या खोजें" },
  smart_assistant_title: { en: "Smart Assistant", hi: "स्मार्ट सहायक" },
  smart_assistant_desc: { en: "Ask questions about your journey", hi: "अपनी यात्रा के बारे में प्रश्न पूछें" },

  // Complaint Page
  complaint_form_title: { en: "Complaint Registration Form", hi: "शिकायत पंजीकरण फॉर्म" },
  pnr_number: { en: "PNR Number", hi: "पीएनआर नंबर" },
  train_number: { en: "Train Number", hi: "ट्रेन नंबर" },
  coach_number: { en: "Coach Number", hi: "कोच नंबर" },
  complaint_category: { en: "Complaint Category", hi: "शिकायत श्रेणी" },
  select_category: { en: "Select a category...", hi: "एक श्रेणी चुनें..." },
  cleanliness: { en: "Cleanliness", hi: "सफाई" },
  food_quality: { en: "Food Quality", hi: "भोजन की गुणवत्ता" },
  staff_behavior: { en: "Staff Behavior", hi: "कर्मचारी व्यवहार" },
  security: { en: "Security", hi: "सुरक्षा" },
  other: { en: "Other", hi: "अन्य" },
  complaint_details: { en: "Complaint Details (Max 500 characters)", hi: "शिकायत का विवरण (अधिकतम 500 अक्षर)" },
  submit_complaint: { en: "Submit Complaint", hi: "शिकायत जमा करें" },
  complaint_submitted: { en: "Complaint submitted successfully!", hi: "शिकायत सफलतापूर्वक जमा की गई!" },
  
  // Waiting Hall Page
  waiting_hall_booking_title: { en: "Waiting Hall Seat Booking", hi: "प्रतीक्षालय सीट बुकिंग" },
  select_seat: { en: "Select an available seat to book.", hi: "बुक करने के लिए एक उपलब्ध सीट चुनें।" },
  seat: { en: "Seat", hi: "सीट" },
  available: { en: "Available", hi: "उपलब्ध" },
  booked: { en: "Booked", hi: "बुक किया हुआ" },
  selected: { en: "Selected", hi: "चयनित" },
  book_selected_seat: { en: "Book Selected Seat", hi: "चयनित सीट बुक करें" },
  seat_booked_success: { en: "Seat booked successfully!", hi: "सीट सफलतापूर्वक बुक हो गई!" },
  
  // Train Info Page
  live_train_status_title: { en: "Live Train Status", hi: "लाइव ट्रेन स्थिति" },
  enter_train_number: { en: "Enter Train Number or Name", hi: "ट्रेन नंबर या नाम दर्ज करें" },
  search: { en: "Search", hi: "खोज" },
  train_name: { en: "Train Name", hi: "ट्रेन का नाम" },
  current_status: { en: "Current Status", hi: "वर्तमान स्थिति" },
  expected_arrival: { en: "Expected Arrival", hi: "अपेक्षित आगमन" },
  platform: { en: "Platform", hi: "प्लेटफार्म" },

  // Transport Page
  transport_booking_title: { en: "Book Local Transport", hi: "स्थानीय परिवहन बुक करें" },
  transport_type: { en: "Transport Type", hi: "परिवहन का प्रकार" },
  auto_rickshaw: { en: "Auto Rickshaw", hi: "ऑटो रिक्शा" },
  bike: { en: "Bike", hi: "बाइक" },
  cab: { en: "Cab", hi: "कैब" },
  pickup_location: { en: "Pickup Location", hi: "पिकअप स्थान" },
  destination: { en: "Destination Address", hi: "गंतव्य का पता" },
  platform_number: { en: "Arrival Platform Number", hi: "आगमन प्लेटफार्म नंबर" },
  booking_time: { en: "Booking Time", hi: "बुकिंग का समय" },
  book_now: { en: "Book Now", hi: "अभी बुक करें" },
  booking_confirmed: { en: "Booking Confirmed!", hi: "बुकिंग की पुष्टि हो गई!" },
  driver_details: { en: "Driver details will be sent to your registered mobile number.", hi: "ड्राइवर का विवरण आपके पंजीकृत मोबाइल नंबर पर भेजा जाएगा।" },
  
  // Alert Page
  arrival_alert_title: { en: "Set Arrival Alert", hi: "आगमन अलर्ट सेट करें" },
  alert_info: { en: "Set a wake-up alert for your destination station.", hi: "अपने गंतव्य स्टेशन के लिए वेक-अप अलर्ट सेट करें।" },
  destination_station: { en: "Destination Station", hi: "गंतव्य स्टेशन" },
  alert_time: { en: "Alert me before (minutes)", hi: "मुझे पहले अलर्ट करें (मिनट)" },
  set_alert: { en: "Set Alert", hi: "अलर्ट सेट करें" },
  alert_set_success: { en: "Alert set successfully!", hi: "अलर्ट सफलतापूर्वक सेट हो गया!" },
  
  // Lost & Found Page
  lost_and_found_title: { en: "Lost & Found Desk", hi: "खोया-पाया डेस्क" },
  i_lost_something: { en: "I Lost Something", hi: "मैंने कुछ खो दिया" },
  i_found_something: { en: "I Found Something", hi: "मुझे कुछ मिला" },
  report_lost_item: { en: "Report a Lost Item", hi: "खोई हुई वस्तु की रिपोर्ट करें" },
  report_found_item: { en: "Report a Found Item", hi: "मिली हुई वस्तु की रिपोर्ट करें" },
  item_name: { en: "Item Name", hi: "वस्तु का नाम" },
  last_seen_location: { en: "Last Seen Location (Train/Station)", hi: "अंतिम बार देखा गया स्थान (ट्रेन/स्टेशन)" },
  location_found: { en: "Location Found (Train/Station)", hi: "मिलने का स्थान (ट्रेन/स्टेशन)" },
  item_description: { en: "Item Description", hi: "वस्तु का विवरण" },
  contact_info: { en: "Your Contact Information (e.g., Phone or Email)", hi: "आपकी संपर्क जानकारी (जैसे, फ़ोन या ईमेल)" },
  submit_report: { en: "Submit Report", hi: "रिपोर्ट जमा करें" },
  report_submitted: { en: "Report submitted. We will contact you if the item is found.", hi: "रिपोर्ट जमा कर दी गई है। वस्तु मिलने पर हम आपसे संपर्क करेंगे।" },
  found_item_submitted: { en: "Thank you for your help! Your report has been submitted.", hi: "आपकी मदद के लिए धन्यवाद! आपकी रिपोर्ट जमा कर दी गई है।" },
  match_found_success: { en: "Good news! A similar item may have been found.", hi: "खुशखबरी! एक समान वस्तु मिल सकती है।" },
  finder_contact_details: { en: "Finder's Contact Details:", hi: "खोजने वाले का संपर्क विवरण:" },


  // Smart Assistant Page
  smart_assistant_page_title: { en: "Smart Travel Assistant", hi: "स्मार्ट यात्रा सहायक" },
  ask_anything: { en: "Ask anything about your travel...", hi: "अपनी यात्रा के बारे में कुछ भी पूछें..." },
  send: { en: "Send", hi: "भेजना" },
  thinking: { en: "Thinking...", hi: "सोच रहा है..." },
};