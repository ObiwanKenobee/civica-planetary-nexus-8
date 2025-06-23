# CIVICA ScrollSignal API Documentation

## 🌐 API Overview

The CIVICA ScrollSignal platform provides a comprehensive RESTful API for civic intelligence operations, ritual governance, and community empowerment. This API enables integration with AWS services, IoT sensors, and community management systems.

### Base URLs

- **Production**: `https://api.civica144.com/v1`
- **Staging**: `https://staging-api.civica144.com/v1`
- **Development**: `http://localhost:3001/v1`

### Authentication

All API requests require authentication using JWT tokens with community-specific scopes.

```http
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
X-Community-ID: kibera-nairobi
X-Cultural-Context: african_ubuntu
```

---

## 📜 Scroll Management

### Create Scroll

Generate a new civic scroll using AI assistance.

```http
POST /scrolls
Content-Type: application/json

{
  "type": "healthcare",
  "voiceInput": {
    "transcript": "The water tastes different and people are getting sick",
    "language": "sw",
    "confidence": 0.92
  },
  "textInput": "Community health concern about water quality",
  "urgency": "high",
  "preferences": {
    "language": "sw",
    "formality": "formal",
    "length": "moderate",
    "ritualIntegration": true,
    "aiCreativity": 0.8
  },
  "culturalContext": {
    "village": "Kibera Community",
    "region": "Nairobi, Kenya",
    "traditions": ["water_blessing_ceremony"]
  }
}
```

**Response:**

```json
{
  "success": true,
  "scroll": {
    "id": "scroll_healthcare_1640995200000",
    "title": "Sacred Water Quality Alert - Kibera Community",
    "content": "🩺 Sacred healing flows through digital pathways...",
    "type": "healthcare",
    "status": "pending_blessing",
    "createdBy": {
      "id": "healer_kofi",
      "name": "Healer Kofi",
      "role": "healer"
    },
    "aiGenerated": true,
    "simulation": {
      "confidence": 0.87,
      "predictions": [...],
      "recommendations": [...]
    },
    "communityImpact": {
      "healthcare": {
        "livesAffected": 342,
        "severityReduction": 0.78
      }
    },
    "sdgAlignment": [
      {
        "goal": 3,
        "alignment": 0.92,
        "contribution": "Preventing waterborne illness"
      }
    ]
  }
}
```

### Get Scroll

Retrieve a specific scroll by ID.

```http
GET /scrolls/{scrollId}
```

### List Scrolls

Get scrolls with filtering and pagination.

```http
GET /scrolls?type=healthcare&status=blessed&limit=20&offset=0
```

### Update Scroll Status

Update scroll status through workflow progression.

```http
PATCH /scrolls/{scrollId}/status
{
  "status": "blessed",
  "blessing": {
    "blessedBy": "elder_amara",
    "ceremony": "blessing_circle",
    "power": 95
  }
}
```

---

## 🎙️ Voice Processing

### Voice-to-Text

Convert voice input to text with cultural context.

```http
POST /voice/transcribe
Content-Type: multipart/form-data

audio: [audio file]
language: sw
culturalContext: african_ubuntu
enhanceTranscript: true
```

**Response:**

```json
{
  "transcript": "Maji ya kisima yanaonekana tofauti na watu wanaumwa tumbo",
  "confidence": 0.94,
  "language": "sw",
  "enhancedTranscript": "The sacred water from our community well appears different and community members are experiencing stomach ailments",
  "culturalEnhancements": [
    "Added sacred context to 'water'",
    "Expanded 'tumbo' to medical context"
  ],
  "duration": 15.3,
  "waveform": [0.2, 0.5, 0.8, ...]
}
```

### Wake Word Detection

Configure and test wake word detection.

```http
POST /voice/wake-word/detect
{
  "audioData": "base64_encoded_audio",
  "wakeWords": ["Sacred Scroll", "Community Scroll"],
  "language": "sw"
}
```

### Language Detection

Automatically detect spoken language.

```http
POST /voice/detect-language
{
  "audioData": "base64_encoded_audio",
  "supportedLanguages": ["en", "sw", "es"]
}
```

---

## 🧠 AI Generation

### Generate Content

Create AI-powered scroll content.

```http
POST /ai/generate
{
  "prompt": "Community water quality concern in Kibera",
  "type": "healthcare",
  "model": "anthropic.claude-3-sonnet",
  "culturalTemplate": "african_ubuntu",
  "preferences": {
    "formality": "ceremonial",
    "length": "detailed",
    "symbolIntegration": true,
    "ritualElements": true
  },
  "context": {
    "community": "Kibera Community",
    "urgency": "high",
    "iotData": {
      "waterQuality": 6.2,
      "airQuality": 45
    }
  }
}
```

**Response:**

```json
{
  "content": "🌍 Ubuntu flows through our digital pathways...",
  "model": "anthropic.claude-3-sonnet",
  "generationTime": 2.3,
  "tokens": {
    "input": 450,
    "output": 280
  },
  "culturalAdaptations": [
    "Ubuntu philosophy integration",
    "Sacred water terminology",
    "Community healing protocols"
  ],
  "metadata": {
    "creativity": 0.8,
    "coherence": 0.94,
    "culturalSensitivity": 0.97
  }
}
```

### List AI Models

Get available AI models and capabilities.

```http
GET /ai/models
```

### Model Performance

Get AI model performance metrics.

```http
GET /ai/models/{modelId}/performance
```

---

## ⚡ Simulation Engine

### Run Simulation

Execute edge computing simulation for scroll impact.

```http
POST /simulation/run
{
  "scenario": "Water quality intervention in Kibera",
  "scrollId": "scroll_healthcare_001",
  "inputs": {
    "communitySize": 5000,
    "currentWaterQuality": 6.2,
    "interventionType": "purification_tablets",
    "timeHorizon": "30_days"
  },
  "iotData": [
    {
      "sensorId": "water_001",
      "type": "water_quality",
      "value": 6.2,
      "location": "Village Well #1"
    }
  ],
  "edgeComputing": true
}
```

**Response:**

```json
{
  "simulationId": "sim_001",
  "confidence": 0.89,
  "executionTime": 850,
  "predictions": [
    {
      "aspect": "Community health improvement",
      "likelihood": 0.87,
      "impact": "high",
      "timeline": "7 days"
    }
  ],
  "multispeciesImpact": [
    {
      "species": "livestock",
      "impact": "positive",
      "severity": 0.6
    }
  ],
  "recommendations": [
    {
      "priority": "immediate",
      "action": "Deploy water purification tablets",
      "resources": ["tablets", "distribution_team"],
      "blessing": true
    }
  ],
  "edgeNode": "wavelength-nairobi-1",
  "carbonFootprint": 0.023
}
```

### Get Simulation Results

Retrieve simulation results by ID.

```http
GET /simulation/{simulationId}
```

### List Active Simulations

Get currently running simulations.

```http
GET /simulation/active
```

---

## 🙏 Ritual & Blessing

### Request Blessing

Initiate a blessing ceremony for a scroll.

```http
POST /ritual/blessing/request
{
  "scrollId": "scroll_healthcare_001",
  "ceremonyType": "blessing_circle",
  "requestedBlessers": ["elder_amara", "healer_kofi"],
  "urgency": "high",
  "culturalProtocol": {
    "tradition": "water_blessing_ceremony",
    "requiredElements": ["sacred_water", "prayer_beads"],
    "timing": "dawn"
  }
}
```

### Perform Blessing

Execute a blessing ceremony.

```http
POST /ritual/blessing/perform
{
  "blessingRequestId": "blessing_req_001",
  "blessedBy": "elder_amara",
  "ceremony": {
    "type": "blessing_circle",
    "duration": 1800,
    "participants": ["elder_amara", "healer_kofi", "community_002"],
    "sacredElements": ["prayer_beads", "sacred_water"],
    "intention": "Healing and protection for our community",
    "power": 95
  },
  "evidence": {
    "photos": ["ceremony_001.jpg"],
    "audio": ["blessing_chant.wav"],
    "witnessSignatures": ["witness_001", "witness_002"]
  }
}
```

### Get Blessing History

Retrieve blessing history for community or scroll.

```http
GET /ritual/blessings?communityId=kibera&scrollType=healthcare&limit=20
```

---

## 🌐 IoT Integration

### Register Sensor

Add a new IoT sensor to the network.

```http
POST /iot/sensors
{
  "sensorId": "water_quality_001",
  "type": "water_quality",
  "location": {
    "name": "Village Well #1",
    "coordinates": [-1.2921, 36.8219],
    "elevation": 1795
  },
  "specifications": {
    "manufacturer": "AquaSense Pro",
    "model": "AS-WQ-2024",
    "accuracy": 0.95,
    "measurementRange": "pH 0-14, TDS 0-2000ppm",
    "connectivity": "5G"
  },
  "calibration": {
    "lastCalibrated": "2024-01-15T10:00:00Z",
    "calibrationCertificate": "cert_001.pdf"
  }
}
```

### Submit Sensor Reading

Send sensor data to the platform.

```http
POST /iot/readings
{
  "sensorId": "water_quality_001",
  "timestamp": "2024-01-20T14:30:00Z",
  "readings": {
    "pH": 6.2,
    "TDS": 450,
    "temperature": 24.5,
    "turbidity": 2.1
  },
  "quality": "good",
  "alert": false,
  "metadata": {
    "batteryLevel": 87,
    "signalStrength": -65,
    "lastMaintenance": "2024-01-10T09:00:00Z"
  }
}
```

### Get Sensor Data

Retrieve sensor readings with filtering.

```http
GET /iot/readings?sensorId=water_quality_001&from=2024-01-20T00:00:00Z&to=2024-01-21T00:00:00Z
```

### Set Alert Thresholds

Configure alert conditions for sensors.

```http
PUT /iot/sensors/{sensorId}/alerts
{
  "thresholds": {
    "pH": {
      "min": 6.5,
      "max": 8.5,
      "critical": true
    },
    "TDS": {
      "max": 500,
      "warning": true
    }
  },
  "notificationMethods": ["scroll_generation", "sms", "community_alert"],
  "escalationRules": [
    {
      "condition": "critical_threshold_exceeded",
      "action": "immediate_scroll_creation",
      "urgency": "emergency"
    }
  ]
}
```

---

## 👥 Community Management

### Register Community

Add a new community to the platform.

```http
POST /community/register
{
  "name": "Kibera Community",
  "region": "Nairobi, Kenya",
  "coordinates": [-1.3133, 36.7967],
  "population": 5000,
  "languages": ["sw", "en"],
  "culturalContext": "african_ubuntu",
  "leadership": {
    "elders": ["elder_amara"],
    "healers": ["healer_kofi"],
    "teachers": ["teacher_fatima"]
  },
  "infrastructure": {
    "internet": "5G",
    "power": "solar_grid",
    "water": "borehole_well"
  },
  "priorities": ["healthcare", "education", "water_quality"]
}
```

### Add Community Member

Register a new community member.

```http
POST /community/{communityId}/members
{
  "name": "Healer Kofi",
  "role": "healer",
  "languages": ["sw", "en"],
  "permissions": ["create_scroll", "bless_scroll", "access_cultural_archive"],
  "specializations": ["traditional_medicine", "water_purification"],
  "contactInfo": {
    "phone": "+254700123456",
    "emergencyContact": "+254700123457"
  },
  "culturalCredentials": {
    "elderRecognition": true,
    "traditionalTraining": "certified",
    "communityStanding": "respected"
  }
}
```

### Get Community Metrics

Retrieve community performance and impact metrics.

```http
GET /community/{communityId}/metrics?timeframe=month
```

**Response:**

```json
{
  "timeframe": "month",
  "scrollsCreated": 45,
  "activeMembers": 23,
  "blessingsPerformed": 38,
  "sdgImpact": {
    "goal3": {
      "scrollsContributing": 15,
      "improvementPercentage": 23
    }
  },
  "culturalPreservation": {
    "storiesArchived": 8,
    "elderParticipation": 0.85
  },
  "technicalMetrics": {
    "systemUptime": 0.998,
    "averageResponseTime": 1.2
  }
}
```

---

## 🏛️ Cultural Archive

### Archive Story

Preserve a cultural story or tradition.

```http
POST /cultural/stories
{
  "title": "The Sacred Well of Wisdom",
  "type": "origin",
  "teller": {
    "id": "elder_amara",
    "credentials": "recognized_elder"
  },
  "content": {
    "narrative": "Long ago, when the first rains came...",
    "moral": "Shared knowledge flows like sacred water",
    "symbols": ["💧", "🧠", "🌟"],
    "language": "sw"
  },
  "permissions": {
    "audience": ["child", "community_member"],
    "sharingRights": "community_only",
    "commercialUse": false
  },
  "culturalProtocols": {
    "tellingOccasions": ["teaching_circles", "initiation_ceremonies"],
    "requiredContext": "water_scarcity_education",
    "restrictions": ["no_unauthorized_recording"]
  }
}
```

### Search Stories

Find stories by criteria.

```http
GET /cultural/stories/search?type=teaching&symbols=💧&audience=child
```

### Get Story Versions

Retrieve different versions of a story.

```http
GET /cultural/stories/{storyId}/versions
```

### Request Story Access

Request access to restricted cultural content.

```http
POST /cultural/access/request
{
  "storyId": "story_001",
  "requesterId": "teacher_fatima",
  "purpose": "educational_use",
  "context": "teaching_water_conservation",
  "audience": "children_age_8_12",
  "duration": "one_semester"
}
```

---

## 📊 Analytics & Monitoring

### Get Platform Analytics

Retrieve comprehensive platform metrics.

```http
GET /analytics/platform?timeframe=week&metrics=community,performance,sdg
```

### Track Custom Event

Log custom analytics events.

```http
POST /analytics/events
{
  "type": "custom_interaction",
  "category": "voice_usage",
  "action": "wake_word_detected",
  "properties": {
    "language": "sw",
    "confidence": 0.94,
    "duration": 2.3
  },
  "userId": "healer_kofi",
  "sessionId": "session_001"
}
```

### Export Analytics Data

Download analytics data for analysis.

```http
GET /analytics/export?format=csv&timeframe=month&anonymize=true
```

---

## 🔧 System Administration

### Health Check

Check system health and status.

```http
GET /health
```

**Response:**

```json
{
  "status": "healthy",
  "timestamp": "2024-01-20T14:30:00Z",
  "services": {
    "database": "healthy",
    "ai_services": "healthy",
    "iot_gateway": "healthy",
    "edge_computing": "healthy"
  },
  "metrics": {
    "uptime": "99.8%",
    "responseTime": "120ms",
    "errorRate": "0.02%"
  }
}
```

### Configuration

Get or update system configuration.

```http
GET /config
PUT /config
{
  "voiceProcessing": {
    "enabledLanguages": ["en", "sw", "es"],
    "confidenceThreshold": 0.8
  },
  "aiGeneration": {
    "defaultModel": "anthropic.claude-3-sonnet",
    "creativityDefault": 0.7
  }
}
```

### Logs

Retrieve system logs.

```http
GET /logs?level=error&from=2024-01-20T00:00:00Z&limit=100
```

---

## 🔐 Security & Compliance

### Access Tokens

Generate JWT tokens for API access.

```http
POST /auth/token
{
  "communityId": "kibera-nairobi",
  "userId": "healer_kofi",
  "scopes": ["scroll:create", "ritual:bless", "cultural:read"],
  "duration": "24h"
}
```

### Audit Trail

Get audit logs for compliance.

```http
GET /audit?action=scroll_creation&userId=healer_kofi&from=2024-01-01
```

### Data Privacy

Manage data privacy and consent.

```http
POST /privacy/consent
{
  "userId": "healer_kofi",
  "dataTypes": ["voice_recordings", "scroll_content", "analytics"],
  "consent": true,
  "duration": "1_year"
}
```

---

## 📚 Error Codes

| Code | Message             | Description                       |
| ---- | ------------------- | --------------------------------- |
| 400  | Invalid Request     | Malformed request data            |
| 401  | Unauthorized        | Missing or invalid authentication |
| 403  | Forbidden           | Insufficient permissions          |
| 404  | Not Found           | Resource does not exist           |
| 409  | Conflict            | Resource already exists           |
| 422  | Validation Error    | Invalid data format               |
| 429  | Rate Limited        | Too many requests                 |
| 500  | Internal Error      | Server error                      |
| 502  | Service Unavailable | External service error            |
| 503  | Maintenance Mode    | Scheduled maintenance             |

---

## 🔗 Webhooks

Configure webhooks to receive real-time notifications.

### Scroll Events

```json
{
  "event": "scroll.created",
  "timestamp": "2024-01-20T14:30:00Z",
  "data": {
    "scrollId": "scroll_001",
    "type": "healthcare",
    "status": "pending_blessing",
    "communityId": "kibera-nairobi"
  }
}
```

### IoT Alerts

```json
{
  "event": "iot.alert.triggered",
  "timestamp": "2024-01-20T14:30:00Z",
  "data": {
    "sensorId": "water_001",
    "alertType": "threshold_exceeded",
    "severity": "critical",
    "readings": {
      "pH": 5.1
    }
  }
}
```

---

## 📞 Support

- **API Documentation**: [https://docs.civica144.com/api](https://docs.civica144.com/api)
- **Developer Portal**: [https://developers.civica144.com](https://developers.civica144.com)
- **Community Forum**: [https://community.civica144.com](https://community.civica144.com)
- **Technical Support**: api-support@civica144.com
- **Emergency Contact**: urgent@civica144.com

---

_Sacred technology in service of regenerative civilization._

**CIVICA 144 • ScrollSignal API v1.0 • 2024**
