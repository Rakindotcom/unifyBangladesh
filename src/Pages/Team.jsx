"use client"

import { useState } from "react"
import { Mail, Linkedin, MapPin, GraduationCap, Award, Users, Target, Heart, Star } from "lucide-react"

const teamMembers = [
  {
    id: 1,
    name: "Arman Hossain",
    position: "CEO",
    fullTitle: "Chief Executive Officer",
    education: "Bachelor of Business Administration (BBA)",
    university: "Yorkville University, Canada",
    description:
      "Arman provides strategic direction and visionary leadership for Unify Bangladesh. He is responsible for high-level decision-making, long-term planning, and managing key partnerships to drive sustainable growth.",
    image: "/arman.jpg",
    color: "from-orange-500 to-red-500",
    bgColor: "bg-orange-50",
    borderColor: "border-orange-200",
    textColor: "text-orange-600",
    specialties: ["Strategic Planning", "Leadership", "Business Development", "Partnership Management"],
    experience: "8+ Years",
    location: "Dhaka, Bangladesh",
  },
  {
    id: 2,
    name: "Akash Das",
    position: "COO",
    fullTitle: "Chief Operating Officer",
    education: "Bachelor's in Computer Science & Engineering (CSE)",
    university: "Brainware University, India",
    description:
      "Akash manages the core operations, including logistics, inventory, imports, and timely delivery. He ensures all departments run efficiently and maintain a seamless operational workflow.",
    image: "/akash.jpg",
    color: "from-blue-500 to-purple-500",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200",
    textColor: "text-blue-600",
    specialties: ["Operations Management", "Logistics", "Inventory Control", "Process Optimization"],
    experience: "6+ Years",
    location: "Dhaka, Bangladesh",
  },
  {
    id: 3,
    name: "Md Jahidul Islam Shawon",
    position: "CFO",
    fullTitle: "Chief Financial Officer",
    education: "B.B.A in Finance & Banking",
    university: "Dhaka Commerce College (National University, Bangladesh)",
    certifications: "Certified in Supply Chain Management",
    description:
      "Shawon handles financial planning, cost control, invoicing, and profitability management. His role ensures financial transparency, sustainability, and regulatory compliance.",
    image: "/jahid.jpg",
    color: "from-green-500 to-teal-500",
    bgColor: "bg-green-50",
    borderColor: "border-green-200",
    textColor: "text-green-600",
    specialties: ["Financial Planning", "Cost Control", "Compliance", "Risk Management"],
    experience: "7+ Years",
    location: "Dhaka, Bangladesh",
  },
  {
    id: 4,
    name: "Shrabani Sarker",
    position: "CMO",
    fullTitle: "Chief Marketing Officer",
    education: "B.Sc (Hons) in Biochemistry and Molecular Biology",
    university: "National University of Bangladesh (2018–2024)",
    description:
      "Shrabani is the creative force behind branding, marketing strategies, and advertising. She focuses on market research, customer engagement, and the development of impactful promotional campaigns.",
    image: "/shraboni.jpg",
    color: "from-pink-500 to-rose-500",
    bgColor: "bg-pink-50",
    borderColor: "border-pink-200",
    textColor: "text-pink-600",
    specialties: ["Brand Strategy", "Digital Marketing", "Customer Engagement", "Creative Campaigns"],
    experience: "5+ Years",
    location: "Dhaka, Bangladesh",
  },
]

const stats = [
  { label: "Years of Experience", value: "25+", icon: Award },
  { label: "Team Members", value: "4", icon: Users },
  { label: "Projects Completed", value: "100+", icon: Target },
  { label: "Client Satisfaction", value: "99%", icon: Heart },
]

const Team = () => {
  const [selectedMember, setSelectedMember] = useState(null)
  const [hoveredMember, setHoveredMember] = useState(null)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-orange-500 via-orange-600 to-red-600 text-white py-20">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <div className="mb-8">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Meet Our Amazing Team</h1>
            <p className="text-xl md:text-2xl text-orange-100 max-w-3xl mx-auto">
              The passionate individuals behind Unify Bangladesh's success story
            </p>
          </div>

          {/* Floating Elements */}
          <div className="absolute top-20 left-10 w-4 h-4 bg-white/20 rounded-full animate-bounce"></div>
          <div
            className="absolute top-32 right-16 w-3 h-3 bg-white/30 rounded-full animate-bounce"
            style={{ animationDelay: "0.5s" }}
          ></div>
          <div
            className="absolute bottom-20 left-20 w-5 h-5 bg-white/15 rounded-full animate-bounce"
            style={{ animationDelay: "1s" }}
          ></div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-8 h-8 text-orange-600" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Members Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Leadership Team</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Meet the visionary leaders who drive our mission forward with expertise and passion
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div
                key={member.id}
                className={`group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden cursor-pointer transform hover:-translate-y-2 ${member.borderColor} border-2`}
                onMouseEnter={() => setHoveredMember(member.id)}
                onMouseLeave={() => setHoveredMember(null)}
                onClick={() => setSelectedMember(member)}
              >
                {/* Background Gradient */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${member.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                ></div>

                {/* Member Image */}
                <div className="relative p-6 pb-0">
                  <div className="relative">
                    <div className={`w-full h-64 bg-gradient-to-br ${member.color} rounded-xl overflow-hidden`}>
                      <img
                        src={member.image || "/placeholder.svg"}
                        alt={member.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>

                    {/* Position Badge */}
                    <div
                      className={`absolute -bottom-4 left-1/2 transform -translate-x-1/2 bg-white ${member.textColor} px-4 py-2 rounded-full font-bold text-sm shadow-lg border-2 ${member.borderColor}`}
                    >
                      {member.position}
                    </div>
                  </div>
                </div>

                {/* Member Info */}
                <div className="p-6 pt-8 text-center">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{member.name}</h3>
                  <p className={`${member.textColor} font-semibold mb-3`}>{member.fullTitle}</p>

                  {/* Education */}
                  <div className="flex items-center justify-center gap-2 mb-4">
                    <GraduationCap className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-600">{member.education}</span>
                  </div>

                  {/* Experience & Location */}
                  <div className="flex justify-between text-sm text-gray-500 mb-4">
                    <span>{member.experience}</span>
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      <span>Dhaka</span>
                    </div>
                  </div>

                  {/* Specialties */}
                  <div className="flex flex-wrap gap-1 justify-center mb-4">
                    {member.specialties.slice(0, 2).map((specialty, idx) => (
                      <span
                        key={idx}
                        className={`${member.bgColor} ${member.textColor} px-2 py-1 rounded-full text-xs font-medium`}
                      >
                        {specialty}
                      </span>
                    ))}
                  </div>

                  {/* View More Button */}
                  <button
                    className={`w-full ${member.textColor} hover:bg-gradient-to-r ${member.color} hover:text-white border-2 ${member.borderColor} py-2 rounded-lg font-medium transition-all duration-300`}
                  >
                    View Profile
                  </button>
                </div>

                {/* Hover Effect Stars */}
                {hoveredMember === member.id && (
                  <div className="absolute top-4 right-4">
                    <Star className="w-6 h-6 text-yellow-400 animate-pulse" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Company Values */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Values</h2>
            <p className="text-xl text-gray-600">The principles that guide our team every day</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Innovation",
                description: "We constantly push boundaries to bring you the latest and best in beauty and wellness.",
                icon: "🚀",
                color: "from-blue-500 to-purple-500",
              },
              {
                title: "Quality",
                description: "Every product we offer meets our rigorous standards for excellence and authenticity.",
                icon: "⭐",
                color: "from-orange-500 to-red-500",
              },
              {
                title: "Customer First",
                description: "Your satisfaction and trust are at the heart of everything we do.",
                icon: "❤️",
                color: "from-pink-500 to-rose-500",
              },
            ].map((value, index) => (
              <div
                key={index}
                className="text-center p-8 rounded-2xl bg-gray-50 hover:bg-white hover:shadow-lg transition-all duration-300"
              >
                <div className="text-4xl mb-4">{value.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Member Detail Modal */}
      {selectedMember && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className={`bg-gradient-to-br ${selectedMember.color} p-6 text-white`}>
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-4">
                  <img
                    src={selectedMember.image || "/placeholder.svg"}
                    alt={selectedMember.name}
                    className="w-20 h-20 rounded-full object-cover border-4 border-white"
                  />
                  <div>
                    <h3 className="text-2xl font-bold">{selectedMember.name}</h3>
                    <p className="text-white/90">{selectedMember.fullTitle}</p>
                  </div>
                </div>
                <button onClick={() => setSelectedMember(null)} className="text-white hover:text-gray-200 text-2xl">
                  ×
                </button>
              </div>
            </div>

            <div className="p-6">
              {/* Education */}
              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <GraduationCap className="w-5 h-5 text-orange-500" />
                  Education
                </h4>
                <p className="text-gray-700 mb-2">{selectedMember.education}</p>
                <p className="text-gray-600 text-sm">{selectedMember.university}</p>
                {selectedMember.certifications && (
                  <div className="mt-2">
                    <div className="flex items-center gap-2">
                      <Award className="w-4 h-4 text-orange-500" />
                      <span className="text-sm text-gray-600">{selectedMember.certifications}</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Description */}
              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 mb-3">About</h4>
                <p className="text-gray-700 leading-relaxed">{selectedMember.description}</p>
              </div>

              {/* Specialties */}
              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 mb-3">Specialties</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedMember.specialties.map((specialty, idx) => (
                    <span
                      key={idx}
                      className={`${selectedMember.bgColor} ${selectedMember.textColor} px-3 py-1 rounded-full text-sm font-medium`}
                    >
                      {specialty}
                    </span>
                  ))}
                </div>
              </div>

              {/* Contact */}
              <div className="flex gap-4">
                <button className="flex-1 bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2">
                  <Mail className="w-4 h-4" />
                  Contact
                </button>
                <button className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2">
                  <Linkedin className="w-4 h-4" />
                  LinkedIn
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Team
