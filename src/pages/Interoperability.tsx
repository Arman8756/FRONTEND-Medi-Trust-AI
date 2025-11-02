import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '../components/shared/Card';
import { Button } from '../components/shared/Button';
import { Badge } from '../components/shared/Badge';

export const Interoperability: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<'fhir' | 'abdm' | 'devices'>('fhir');
  const [fhirData, setFhirData] = useState<any>(null);
  const [abdmStatus, setAbdmStatus] = useState('connected');
  const [showFhirPreview, setShowFhirPreview] = useState(false);

  // Mock FHIR Patient Resource
  const generateFhirPatient = () => {
    return {
      resourceType: "Patient",
      id: "rahul-verma-001",
      meta: {
        versionId: "1",
        lastUpdated: new Date().toISOString(),
        profile: ["http://hl7.org/fhir/StructureDefinition/Patient"]
      },
      identifier: [
        {
          use: "official",
          system: "https://ndhm.gov.in/abha",
          value: "12-3456-7890-6789"
        },
        {
          use: "secondary",
          system: "https://meditrust.ai/patient-id",
          value: "MT-RV-001"
        }
      ],
      active: true,
      name: [
        {
          use: "official",
          family: "Verma",
          given: ["Rahul"],
          text: "Rahul Verma"
        }
      ],
      telecom: [
        {
          system: "phone",
          value: "+91 98765 43216",
          use: "mobile"
        },
        {
          system: "email",
          value: "rahul.verma@email.com",
          use: "home"
        }
      ],
      gender: "male",
      birthDate: "1996-03-15",
      address: [
        {
          use: "home",
          type: "physical",
          text: "Sector 15, Gurgaon, Haryana, India",
          city: "Gurgaon",
          state: "Haryana",
          postalCode: "122001",
          country: "IN"
        }
      ],
      maritalStatus: {
        coding: [
          {
            system: "http://terminology.hl7.org/CodeSystem/v3-MaritalStatus",
            code: "S",
            display: "Never Married"
          }
        ]
      }
    };
  };

  // Mock FHIR Observation Resource (Blood Pressure)
  const generateFhirObservation = () => {
    return {
      resourceType: "Observation",
      id: "bp-observation-001",
      meta: {
        versionId: "1",
        lastUpdated: new Date().toISOString(),
        profile: ["http://hl7.org/fhir/StructureDefinition/Observation"]
      },
      status: "final",
      category: [
        {
          coding: [
            {
              system: "http://terminology.hl7.org/CodeSystem/observation-category",
              code: "vital-signs",
              display: "Vital Signs"
            }
          ]
        }
      ],
      code: {
        coding: [
          {
            system: "http://loinc.org",
            code: "85354-9",
            display: "Blood pressure panel"
          }
        ],
        text: "Blood Pressure"
      },
      subject: {
        reference: "Patient/rahul-verma-001",
        display: "Rahul Verma"
      },
      effectiveDateTime: new Date().toISOString(),
      issued: new Date().toISOString(),
      performer: [
        {
          reference: "Practitioner/dr-sharma",
          display: "Dr. Rajesh Sharma"
        }
      ],
      component: [
        {
          code: {
            coding: [
              {
                system: "http://loinc.org",
                code: "8480-6",
                display: "Systolic blood pressure"
              }
            ]
          },
          valueQuantity: {
            value: 120,
            unit: "mmHg",
            system: "http://unitsofmeasure.org",
            code: "mm[Hg]"
          }
        },
        {
          code: {
            coding: [
              {
                system: "http://loinc.org",
                code: "8462-4",
                display: "Diastolic blood pressure"
              }
            ]
          },
          valueQuantity: {
            value: 80,
            unit: "mmHg",
            system: "http://unitsofmeasure.org",
            code: "mm[Hg]"
          }
        }
      ]
    };
  };

  const handleExportFhir = (type: string) => {
    let data;
    if (type === 'patient') {
      data = generateFhirPatient();
    } else if (type === 'observation') {
      data = generateFhirObservation();
    }
    
    setFhirData(data);
    setShowFhirPreview(true);

    // Download JSON
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `fhir-${type}-${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const abdmIntegrations = [
    {
      name: 'ABHA (Ayushman Bharat Health Account)',
      status: 'Connected',
      description: 'Unique health ID for all citizens',
      features: ['Patient Identification', 'Health Records Linking', 'Consent Management'],
      icon: '🆔'
    },
    {
      name: 'Health Information Provider (HIP)',
      status: 'Connected',
      description: 'Share health records with authorized facilities',
      features: ['Record Sharing', 'Access Control', 'Audit Logs'],
      icon: '🏥'
    },
    {
      name: 'Health Information User (HIU)',
      status: 'Connected',
      description: 'Receive health records from other facilities',
      features: ['Record Retrieval', 'Data Aggregation', 'Analytics'],
      icon: '📊'
    },
    {
      name: 'Health Locker',
      status: 'Connected',
      description: 'Personal health record storage',
      features: ['Secure Storage', 'Patient Access', 'Data Portability'],
      icon: '🔐'
    }
  ];

  const connectedDevices = [
    {
      name: 'Fitbit Charge 5',
      type: 'Fitness Tracker',
      status: 'Connected',
      lastSync: '2 mins ago',
      data: ['Steps', 'Heart Rate', 'Sleep', 'Calories'],
      icon: '⌚'
    },
    {
      name: 'Apple Health',
      type: 'Health App',
      status: 'Connected',
      lastSync: '5 mins ago',
      data: ['Activity', 'Nutrition', 'Mindfulness', 'Sleep'],
      icon: '📱'
    },
    {
      name: 'Omron Blood Pressure Monitor',
      type: 'Medical Device',
      status: 'Connected',
      lastSync: '1 hour ago',
      data: ['Blood Pressure', 'Heart Rate'],
      icon: '🩺'
    },
    {
      name: 'Accu-Chek Glucometer',
      type: 'Medical Device',
      status: 'Connected',
      lastSync: '3 hours ago',
      data: ['Blood Glucose'],
      icon: '💉'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h1 className="text-5xl font-bold gradient-text mb-4 flex items-center justify-center gap-3">
          <svg className="w-12 h-12 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
            <path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z"/>
          </svg>
          Interoperability & Integration
        </h1>
        <p className="text-gray-600 text-lg">
          FHIR Standards • ABDM Integration • Connected Devices
        </p>
      </motion.div>

      {/* Tabs */}
      <div className="max-w-6xl mx-auto">
        <div className="flex bg-white rounded-xl shadow-card p-2 mb-6">
          <button
            onClick={() => setSelectedTab('fhir')}
            className={`flex-1 py-3 px-6 rounded-lg font-medium transition-all ${
              selectedTab === 'fhir'
                ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            📋 FHIR Standards
          </button>
          <button
            onClick={() => setSelectedTab('abdm')}
            className={`flex-1 py-3 px-6 rounded-lg font-medium transition-all ${
              selectedTab === 'abdm'
                ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            🇮🇳 ABDM Integration
          </button>
          <button
            onClick={() => setSelectedTab('devices')}
            className={`flex-1 py-3 px-6 rounded-lg font-medium transition-all ${
              selectedTab === 'devices'
                ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            ⌚ Connected Devices
          </button>
        </div>

        {/* FHIR Tab */}
        {selectedTab === 'fhir' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <Card title="FHIR (Fast Healthcare Interoperability Resources)">
              <div className="space-y-4">
                <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                  <h3 className="font-semibold text-gray-900 mb-2">✅ FHIR R4 Compliant</h3>
                  <p className="text-sm text-gray-700">
                    All medical records are stored and can be exported in FHIR R4 format,
                    ensuring seamless interoperability with any FHIR-compliant system worldwide.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white rounded-lg p-4 border border-gray-200">
                    <h4 className="font-semibold text-gray-900 mb-3">Supported FHIR Resources</h4>
                    <div className="space-y-2">
                      {['Patient', 'Observation', 'Condition', 'MedicationRequest', 'DiagnosticReport', 'Procedure', 'AllergyIntolerance', 'Immunization'].map((resource) => (
                        <div key={resource} className="flex items-center justify-between">
                          <span className="text-sm text-gray-700">• {resource}</span>
                          <Badge variant="success">✓</Badge>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-white rounded-lg p-4 border border-gray-200">
                    <h4 className="font-semibold text-gray-900 mb-3">Export Options</h4>
                    <div className="space-y-3">
                      <Button
                        variant="primary"
                        onClick={() => handleExportFhir('patient')}
                        className="w-full"
                      >
                        📄 Export Patient Resource
                      </Button>
                      <Button
                        variant="primary"
                        onClick={() => handleExportFhir('observation')}
                        className="w-full"
                      >
                        📊 Export Observation Resource
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full"
                      >
                        📦 Export Complete Bundle
                      </Button>
                    </div>
                  </div>
                </div>

                {/* FHIR Preview */}
                {showFhirPreview && fhirData && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="bg-gray-900 rounded-lg p-4"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-semibold text-white">FHIR JSON Preview</h4>
                      <button
                        onClick={() => setShowFhirPreview(false)}
                        className="text-white hover:text-gray-300"
                      >
                        ✕
                      </button>
                    </div>
                    <pre className="text-xs text-green-400 overflow-x-auto max-h-96">
                      {JSON.stringify(fhirData, null, 2)}
                    </pre>
                  </motion.div>
                )}
              </div>
            </Card>
          </motion.div>
        )}

        {/* ABDM Tab */}
        {selectedTab === 'abdm' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <Card title="Ayushman Bharat Digital Mission (ABDM) Integration">
              <div className="space-y-4">
                <div className="bg-gradient-to-r from-orange-50 to-green-50 rounded-lg p-4 border-2 border-orange-200">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">🇮🇳</span>
                    <div>
                      <h3 className="font-semibold text-gray-900">Connected to National Health Stack</h3>
                      <p className="text-sm text-gray-700">
                        Integrated with India's Ayushman Bharat Digital Mission for nationwide health record interoperability
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {abdmIntegrations.map((integration, idx) => (
                    <div key={idx} className="bg-white rounded-lg p-4 border border-gray-200">
                      <div className="flex items-start gap-3 mb-3">
                        <span className="text-3xl">{integration.icon}</span>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <h4 className="font-semibold text-gray-900">{integration.name}</h4>
                            <Badge variant="success">{integration.status}</Badge>
                          </div>
                          <p className="text-xs text-gray-600 mb-2">{integration.description}</p>
                        </div>
                      </div>
                      <div className="space-y-1">
                        {integration.features.map((feature, fidx) => (
                          <div key={fidx} className="flex items-center gap-2">
                            <span className="text-green-500 text-xs">✓</span>
                            <span className="text-xs text-gray-700">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                <Card title="ABHA Integration Status" className="bg-gradient-to-r from-blue-50 to-purple-50">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center">
                      <div className="text-3xl mb-2">✅</div>
                      <div className="text-2xl font-bold text-green-600">Active</div>
                      <p className="text-xs text-gray-600">ABHA Status</p>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl mb-2">🔗</div>
                      <div className="text-2xl font-bold text-blue-600">4</div>
                      <p className="text-xs text-gray-600">Linked Facilities</p>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl mb-2">📊</div>
                      <div className="text-2xl font-bold text-purple-600">127</div>
                      <p className="text-xs text-gray-600">Shared Records</p>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl mb-2">🔐</div>
                      <div className="text-2xl font-bold text-orange-600">256-bit</div>
                      <p className="text-xs text-gray-600">Encryption</p>
                    </div>
                  </div>
                </Card>
              </div>
            </Card>
          </motion.div>
        )}

        {/* Devices Tab */}
        {selectedTab === 'devices' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <Card title="Connected Wearables & Medical Devices">
              <div className="space-y-4">
                <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
                  <h3 className="font-semibold text-gray-900 mb-2">⌚ Real-time Health Data Sync</h3>
                  <p className="text-sm text-gray-700">
                    Automatically sync health data from wearables and medical devices for comprehensive health tracking.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {connectedDevices.map((device, idx) => (
                    <div key={idx} className="bg-white rounded-lg p-4 border border-gray-200 hover:border-purple-300 transition-colors">
                      <div className="flex items-start gap-3 mb-3">
                        <span className="text-3xl">{device.icon}</span>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <h4 className="font-semibold text-gray-900">{device.name}</h4>
                            <Badge variant="success">{device.status}</Badge>
                          </div>
                          <p className="text-xs text-gray-600">{device.type}</p>
                          <p className="text-xs text-gray-500 mt-1">Last sync: {device.lastSync}</p>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {device.data.map((dataType, didx) => (
                          <Badge key={didx} variant="info" className="text-xs">
                            {dataType}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-4 border border-green-200">
                  <h4 className="font-semibold text-gray-900 mb-3">📊 Today's Synced Data</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">8,542</div>
                      <p className="text-xs text-gray-600">Steps</p>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-red-600">72 bpm</div>
                      <p className="text-xs text-gray-600">Avg Heart Rate</p>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-600">7.5 hrs</div>
                      <p className="text-xs text-gray-600">Sleep</p>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-orange-600">420 kcal</div>
                      <p className="text-xs text-gray-600">Calories Burned</p>
                    </div>
                  </div>
                </div>

                <Button variant="primary" className="w-full">
                  ➕ Connect New Device
                </Button>
              </div>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  );
};
