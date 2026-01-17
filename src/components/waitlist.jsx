'use client';

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Geist, Geist_Mono } from "next/font/google";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

const neighborhoods = [
  "Lakeview / Wrigley",
  "Lincoln Park / Old Town",
  "Wicker / Bucktown / Logan Square",
  "West Loop / Fulton Market",
  "River North / Gold Coast",
  "No preference",
];

export default function Waitlist() {
  const [expanded, setExpanded] = useState(true);
  const [userLocationType, setUserLocationType] = useState("");
  const [formData, setFormData] = useState({
    phone: "",
    firstName: "",
    age: "",
    gender: "",
    sexualIdentification: [],
    primaryNeighborhood: "",
    locationType: "",
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  // Invite gating
  const [inviteCode, setInviteCode] = useState("");
  const [inviteStatus, setInviteStatus] = useState({
    checked: false,
    valid: false,
    usesRemaining: 0,
  });

  // If you want to show their new link after signup
  const [myInviteLink, setMyInviteLink] = useState("");

  useEffect(() => {
    // Parse code from URL - handle both encoded and unencoded formats
    let code = "";
    try {
      const params = new URLSearchParams(window.location.search);
      code = params.get("code") || "";
      
      // If URLSearchParams didn't work, try manual parsing
      if (!code && window.location.search) {
        const search = decodeURIComponent(window.location.search);
        const match = search.match(/[?&]code=([^&]*)/);
        if (match) {
          code = match[1];
        }
      }
    } catch (e) {
      // Silently handle parsing errors
    }
    
    code = code.trim().toUpperCase();
    setInviteCode(code);

    if (!code) {
      setInviteStatus({ checked: true, valid: false, usesRemaining: 0 });
      return;
    }

    (async () => {
      try {
        const url = `/api/invite/validate?code=${encodeURIComponent(code)}`;
        const res = await fetch(url);
        
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        
        const data = await res.json();
        
        setInviteStatus({
          checked: true,
          valid: data.valid === true,
          usesRemaining: Number(data.usesRemaining || 0),
        });
      } catch (e) {
        console.error("[waitlist] Validate error:", e);
        setInviteStatus({ checked: true, valid: false, usesRemaining: 0 });
      }
    })();
  }, []);

  const formatPhoneNumber = (value) => {
    const digits = value.replace(/\D/g, "");
    if (digits.length === 0) return "";

    const normalized = digits.startsWith("1") ? digits.slice(1) : digits;
    const area = normalized.slice(0, 3);
    const middle = normalized.slice(3, 6);
    const last = normalized.slice(6, 10);

    let formatted = "+1";
    if (area) {
      formatted += ` (${area}`;
      if (normalized.length > 3) formatted += `)`;
    }
    if (middle) formatted += ` ${middle}`;
    if (last) formatted += `-${last}`;

    return formatted;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "phone") {
      setFormData((prev) => {
        const prevRawDigits = prev.phone.replace(/\D/g, "");
        const newRawDigits = value.replace(/\D/g, "");

        const isDeleting = newRawDigits.length < prevRawDigits.length;
        const newPhone = isDeleting ? value : formatPhoneNumber(value);

        return { ...prev, phone: newPhone };
      });
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    const phoneRegex = /^\+1 \(\d{3}\) \d{3}-\d{4}$/;

    if (!phoneRegex.test(formData.phone)) {
      newErrors.phone = "Phone number must be in the format +1 (XXX) XXX-XXXX.";
    }
    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required.";
    }
    const age = parseInt(formData.age, 10);
    if (isNaN(age) || age < 18) {
      newErrors.age = "You must be at least 18 years old.";
    }
    if (!formData.gender) {
      newErrors.gender = "Please select a gender.";
    }
    if (!formData.sexualIdentification[0]) {
      newErrors.sexualIdentification = "Please select a sexual identification.";
    }
    if (!formData.primaryNeighborhood) {
      newErrors.primaryNeighborhood = "Please select a neighborhood.";
    }
    if (!formData.locationType) {
      newErrors.locationType = "Please select a location type.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    if (!validateForm()) return;

    if (!inviteStatus.checked || !inviteStatus.valid) {
      setErrors({ general: "Invite required to join." });
      return;
    }

    try {
      const rawPhone = formData.phone.replace(/\D/g, "");

      const res = await fetch("/api/invite/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          inviteCode,
          ...formData,
          phone: rawPhone, // raw digits
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.ok) {
        const map = {
          invalid_invite: "That invite code is invalid.",
          used_up: "That invite has already been used up.",
          duplicate_phone: "This number has already been used to sign up.",
          missing_fields: "Please complete all fields.",
        };
        setErrors({ general: map[data.error] || "Something went wrong. Please try again." });
        return;
      }

      // Success
      setMyInviteLink(data.myInviteLink || "");
      setUserLocationType(formData.locationType);

      setFormData({
        phone: "",
        firstName: "",
        age: "",
        gender: "",
        sexualIdentification: [],
        primaryNeighborhood: "",
        locationType: "",
      });

      setExpanded(false);
      setSubmitted(true);
    } catch (error) {
      console.error("Error submitting:", error);
      setErrors({ general: "Something went wrong. Please try again." });
    }
  };

  return (
    <div className="font-hind font-obv-light flex items-center justify-center h-full text-white px-4">
      <AnimatePresence mode="wait">
        {submitted && (
          <motion.div
            key="confirmation"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="text-center max-w-md"
          >
            {userLocationType === "No" ? (
              <div>
                <h2 className="text-5xl mt-[5vh] font-semibold mb-2 font-ekl">
                  Thanks for signing up.
                </h2>
                <p className="text-white/80 font-obv-light">
                  Unfortunately, Eclipse hasn't launched in your city yet, but we'll be in contact soon.
                </p>
              </div>
            ) : (
              <div>
                <h2 className="text-6xl mt-[5vh] font-semibold mb-2 font-ekl">
                  Welcome to eclipse.
                </h2>
                <p className="text-white/80 font-obv-light">
                  Thanks for signing up.<br />
                  We’ll see you out in Chicago this Month!
                </p>

                {myInviteLink && (
                  <div className="mt-5 text-white/90 text-sm">
                    <div className="mb-1">Your private invite link (3 uses):</div>
                    <div className="break-all underline">{myInviteLink}</div>
                    <div className="text-white/70 mt-2">
                      Send it to up to 3 friends for first access.
                    </div>
                  </div>
                )}
              </div>
            )}
          </motion.div>
        )}

        {expanded && !submitted && (
          <motion.form
            layoutId="waitlist"
            key="form"
            onSubmit={handleSubmit}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ type: "spring", bounce: 0.25, duration: 0.6 }}
            className="relative w-full max-w-md space-y-4 mt-8 p-6 font-obv-light"
          >
            {/* LOCK OVERLAY: only blocks the form area */}
            {inviteStatus.checked && !inviteStatus.valid && (
              <div className="absolute inset-0 z-20 flex flex-col items-center justify-center rounded-lg backdrop-blur-md bg-black/40 p-6 text-center">
                <div className="text-2xl font-ekl mb-2">Invite Only</div>
                <div className="text-white/80 text-sm">
                  The waitlist is currently closed. Use a private invite link to sign up.
                </div>
              </div>
            )}

            {errors.general && <p className="text-red-300 text-sm">{errors.general}</p>}

            <input
              name="firstName"
              type="text"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleChange}
              className="font-obv-light w-full px-4 py-2 border border-white/20 backdrop-blur-2xl bg-white/30 text-white placeholder-white/60 focus:outline-none rounded-lg"
            />
            {errors.firstName && <p className="text-red-300 text-sm">{errors.firstName}</p>}

            <input
              name="phone"
              type="tel"
              maxLength={18}
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              className="font-obv-light w-full px-4 py-2 border border-white/20 backdrop-blur-2xl bg-white/30 text-white placeholder-white/60 focus:outline-none rounded-lg"
            />
            {errors.phone && <p className="text-red-300 text-sm">{errors.phone}</p>}

            <div className="flex flex-row">
              <input
                name="age"
                type="number"
                min={18}
                placeholder="Age (18+)"
                value={formData.age}
                onChange={handleChange}
                className="font-obv-light w-full px-4 mr-2 py-2 border border-white/20 backdrop-blur-2xl bg-white/30 text-white placeholder-white/60 focus:outline-none rounded-lg"
              />
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="font-obv-light w-full px-4 ml-2 py-2 border border-white/20 backdrop-blur-2xl bg-white/30 text-white focus:outline-none rounded-lg"
              >
                <option value="" disabled hidden>Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="nonbinary">Nonbinary</option>
                <option value="prefer_not_to_say">Prefer not to say</option>
              </select>
            </div>
            {errors.age && <p className="text-red-300 text-sm">{errors.age}</p>}
            {errors.gender && <p className="text-red-300 text-sm">{errors.gender}</p>}

            <select
              name="sexualIdentification"
              value={formData.sexualIdentification[0] || ""}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  sexualIdentification: [e.target.value],
                }))
              }
              className="font-obv-light w-full px-4 py-2 border border-white/20 backdrop-blur-2xl bg-white/30 text-white focus:outline-none rounded-lg"
            >
              <option value="" disabled hidden>Sexual Identification</option>
              <option value="Straight">Straight</option>
              <option value="Gay">Gay</option>
              <option value="Lesbian">Lesbian</option>
              <option value="Bisexual">Bisexual</option>
              <option value="Pansexual">Pansexual</option>
              <option value="Queer">Queer</option>
              <option value="Other">Other</option>
              <option value="None">Prefer Not to Answer</option>
            </select>
            {errors.sexualIdentification && <p className="text-red-300 text-sm">{errors.sexualIdentification}</p>}

            <select
              name="primaryNeighborhood"
              value={formData.primaryNeighborhood}
              onChange={handleChange}
              className="font-obv-light w-full px-4 py-2 border border-white/20 backdrop-blur-2xl bg-white/30 text-white focus:outline-none rounded-lg"
            >
              <option value="" disabled hidden>Favorite Neighborhoods to Go Out In</option>
              {neighborhoods.map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
            {errors.primaryNeighborhood && <p className="text-red-300 text-sm">{errors.primaryNeighborhood}</p>}

            <div>
              <label className="text-sm font-obv-light text-white mb-1 block">
                Do you live in Chicago or a nearby suburb?
              </label>
              <div className="flex indent- space-x-4">
                {["Yes", "No"].map((value) => (
                  <label key={value} className="text-white font-obv-light">
                    <input
                      type="radio"
                      name="locationType"
                      value={value}
                      checked={formData.locationType === value}
                      onChange={handleChange}
                      className="mr-2"
                    />
                    {value}
                  </label>
                ))}
              </div>
              {errors.locationType && <p className="text-red-300 text-sm">{errors.locationType}</p>}
            </div>

            <p className="text-xs text-white/70 text-center -mt-2 mb-2 px-2">
              By signing up, you agree to receive SMS messages from Eclipse about app updates. Message and data rates may apply. Message frequency varies. You can opt out at any time. View our{" "}
              <a href="/legal" className="underline hover:text-white">Privacy Policy.</a>
            </p>

            <button
              type="submit"
              className="w-full font-obv-light backdrop-blur-md bg-[#1D225B] hover:cursor-pointer text-white font-medium py-2 px-4 border border-white/30 rounded-lg"
            >
              Join the List
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
