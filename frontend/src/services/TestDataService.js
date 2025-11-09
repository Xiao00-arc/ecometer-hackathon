// TestDataService.js - Comprehensive mock data for professional demo

class TestDataService {
  constructor() {
    this.generateMockData();
  }

  generateMockData() {
    // Generate realistic timestamps for the past 30 days
    this.timeRange = this.generateTimeRange();
    
    // Department data with realistic profiles
    this.departments = [
      {
        id: 1,
        name: 'Computer Science & Engineering',
        code: 'CSE',
        area: 15000,
        floors: 4,
        rooms: 45,
        occupancy: 850,
        efficiency_rating: 'A',
        head: 'Dr. Sarah Johnson',
        contact: 'sarah.johnson@university.edu',
        budget: 285000,
        color: '#3498db'
      },
      {
        id: 2,
        name: 'VLSI Design Lab',
        code: 'VLSI',
        area: 8000,
        floors: 2,
        rooms: 20,
        occupancy: 320,
        efficiency_rating: 'B+',
        head: 'Prof. Michael Chen',
        contact: 'michael.chen@university.edu',
        budget: 145000,
        color: '#e74c3c'
      },
      {
        id: 3,
        name: 'Administration Building',
        code: 'ADMIN',
        area: 12000,
        floors: 3,
        rooms: 35,
        occupancy: 180,
        efficiency_rating: 'B',
        head: 'Ms. Jennifer Davis',
        contact: 'jennifer.davis@university.edu',
        budget: 95000,
        color: '#f39c12'
      },
      {
        id: 4,
        name: 'Central Library',
        code: 'LIB',
        area: 20000,
        floors: 5,
        rooms: 60,
        occupancy: 1200,
        efficiency_rating: 'A-',
        head: 'Dr. Robert Wilson',
        contact: 'robert.wilson@university.edu',
        budget: 320000,
        color: '#27ae60'
      },
      {
        id: 5,
        name: 'Student Dining Hall',
        code: 'CAFE',
        area: 5000,
        floors: 1,
        rooms: 8,
        occupancy: 400,
        efficiency_rating: 'C+',
        head: 'Mr. David Brown',
        contact: 'david.brown@university.edu',
        budget: 75000,
        color: '#9b59b6'
      },
      {
        id: 6,
        name: 'Mechanical Engineering',
        code: 'MECH',
        area: 18000,
        floors: 3,
        rooms: 40,
        occupancy: 620,
        efficiency_rating: 'B+',
        head: 'Dr. Lisa Anderson',
        contact: 'lisa.anderson@university.edu',
        budget: 265000,
        color: '#16a085'
      },
      {
        id: 7,
        name: 'Student Dormitory A',
        code: 'DORM_A',
        area: 25000,
        floors: 8,
        rooms: 200,
        occupancy: 800,
        efficiency_rating: 'B-',
        head: 'Ms. Karen White',
        contact: 'karen.white@university.edu',
        budget: 185000,
        color: '#e67e22'
      }
    ];

    // Generate energy data for past 30 days
    this.energyData = this.generateEnergyData();
    
    // Generate AI suggestions with categories
    this.aiSuggestions = this.generateAISuggestions();
    
    // Generate alerts and notifications
    this.alerts = this.generateAlerts();
    
    // Generate financial data
    this.financialData = this.generateFinancialData();
  }

  generateTimeRange() {
    const range = [];
    const now = new Date();
    for (let i = 29; i >= 0; i--) {
      const date = new Date(now);
      date.setDate(date.getDate() - i);
      range.push(date);
    }
    return range;
  }

  generateEnergyData() {
    const data = [];
    const sourceTypes = ['ELECTRICITY', 'HEATING', 'COOLING', 'TRANSPORT', 'WASTE'];
    
    this.timeRange.forEach(date => {
      this.departments.forEach(dept => {
        sourceTypes.forEach(sourceType => {
          // Generate realistic consumption based on department and source type
          let baseConsumption = this.getBaseConsumption(dept, sourceType);
          
          // Add realistic variations (weather, occupancy, time patterns)
          const variation = this.getVariationFactor(date, sourceType);
          const consumption = baseConsumption * variation;
          
          data.push({
            id: data.length + 1,
            departmentId: dept.id,
            departmentName: dept.name,
            departmentCode: dept.code,
            kwhUsed: parseFloat(consumption.toFixed(2)),
            sourceType: sourceType,
            timestamp: date.toISOString(),
            costUsd: parseFloat((consumption * this.getCostPerKwh(sourceType)).toFixed(2)),
            carbonKg: parseFloat((consumption * this.getCarbonFactor(sourceType)).toFixed(3)),
            efficiency: this.getEfficiencyScore(dept, sourceType),
            weather: this.getWeatherData(date)
          });
        });
      });
    });
    
    return data;
  }

  getBaseConsumption(dept, sourceType) {
    const baseRates = {
      'ELECTRICITY': dept.area * 0.015, // 0.015 kWh per sq ft per day
      'HEATING': dept.area * 0.008,
      'COOLING': dept.area * 0.012,
      'TRANSPORT': dept.occupancy * 0.5, // 0.5 kWh per person per day
      'WASTE': dept.occupancy * 0.2
    };
    return baseRates[sourceType] || 0;
  }

  getVariationFactor(date, sourceType) {
    const dayOfWeek = date.getDay();
    const hour = date.getHours();
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
    const month = date.getMonth();
    
    let factor = 1.0;
    
    // Weekend reduction
    if (isWeekend) factor *= 0.7;
    
    // Seasonal variations
    if (sourceType === 'HEATING') {
      factor *= (month < 3 || month > 9) ? 1.5 : 0.3;
    } else if (sourceType === 'COOLING') {
      factor *= (month > 4 && month < 9) ? 1.4 : 0.4;
    }
    
    // Random daily variation
    factor *= (0.8 + Math.random() * 0.4);
    
    return factor;
  }

  getCostPerKwh(sourceType) {
    const rates = {
      'ELECTRICITY': 0.12,
      'HEATING': 0.08,
      'COOLING': 0.15,
      'TRANSPORT': 0.18,
      'WASTE': 0.05
    };
    return rates[sourceType] || 0.12;
  }

  getCarbonFactor(sourceType) {
    const factors = {
      'ELECTRICITY': 0.45, // kg CO2 per kWh
      'HEATING': 0.25,
      'COOLING': 0.48,
      'TRANSPORT': 0.65,
      'WASTE': 0.15
    };
    return factors[sourceType] || 0.45;
  }

  getEfficiencyScore(dept, sourceType) {
    const baseScores = {
      'A': 95, 'A-': 90, 'B+': 85, 'B': 80, 'B-': 75, 'C+': 70, 'C': 65
    };
    return baseScores[dept.efficiency_rating] + (Math.random() * 10 - 5);
  }

  getWeatherData(date) {
    const temp = 20 + Math.sin((date.getMonth() / 12) * 2 * Math.PI) * 15 + (Math.random() * 10 - 5);
    return {
      temperature: parseFloat(temp.toFixed(1)),
      humidity: 40 + Math.random() * 40,
      condition: ['sunny', 'cloudy', 'rainy'][Math.floor(Math.random() * 3)]
    };
  }

  generateAISuggestions() {
    return [
      {
        id: 1,
        title: 'Optimize HVAC Schedule in CSE Building',
        description: 'AI analysis shows 30% energy waste during off-hours. Implementing smart scheduling could save $2,400 monthly.',
        category: 'ENERGY_SAVING',
        priority: 'HIGH',
        estimatedSavingsUsd: 2400,
        implementationTime: '2 weeks',
        difficulty: 'Medium',
        departments: ['CSE'],
        impact: 'High',
        confidence: 92,
        createdAt: '2025-11-07T10:30:00Z'
      },
      {
        id: 2,
        title: 'LED Retrofit for Library Reading Areas',
        description: 'Replace 150 fluorescent fixtures with smart LED systems. Motion sensors and daylight harvesting included.',
        category: 'COST_REDUCTION',
        priority: 'HIGH',
        estimatedSavingsUsd: 1800,
        implementationTime: '1 month',
        difficulty: 'Easy',
        departments: ['LIB'],
        impact: 'Medium',
        confidence: 88,
        createdAt: '2025-11-06T14:15:00Z'
      },
      {
        id: 3,
        title: 'Solar Panel Installation - Dormitory Roof',
        description: 'Install 200kW solar array on Dorm A roof. Could offset 60% of building electricity consumption.',
        category: 'SUSTAINABILITY',
        priority: 'MEDIUM',
        estimatedSavingsUsd: 8000,
        implementationTime: '3 months',
        difficulty: 'Hard',
        departments: ['DORM_A'],
        impact: 'Very High',
        confidence: 85,
        createdAt: '2025-11-05T09:20:00Z'
      },
      {
        id: 4,
        title: 'Predictive Maintenance for MECH Lab Equipment',
        description: 'Implement IoT sensors for early detection of equipment inefficiencies. Prevent 40% of unexpected failures.',
        category: 'MAINTENANCE',
        priority: 'MEDIUM',
        estimatedSavingsUsd: 1200,
        implementationTime: '6 weeks',
        difficulty: 'Medium',
        departments: ['MECH'],
        impact: 'Medium',
        confidence: 79,
        createdAt: '2025-11-04T16:45:00Z'
      },
      {
        id: 5,
        title: 'Smart Window Films for Admin Building',
        description: 'Install electrochromic smart glass to reduce cooling load by 25% during summer months.',
        category: 'ENERGY_SAVING',
        priority: 'LOW',
        estimatedSavingsUsd: 950,
        implementationTime: '2 weeks',
        difficulty: 'Easy',
        departments: ['ADMIN'],
        impact: 'Low',
        confidence: 82,
        createdAt: '2025-11-03T11:10:00Z'
      }
    ];
  }

  generateAlerts() {
    return [
      {
        id: 1,
        type: 'WARNING',
        title: 'Unusual Energy Spike Detected',
        message: 'VLSI Lab showing 35% higher consumption than normal. Possible equipment malfunction.',
        department: 'VLSI',
        timestamp: '2025-11-08T08:30:00Z',
        severity: 'medium',
        acknowledged: false
      },
      {
        id: 2,
        type: 'INFO',
        title: 'Monthly Target Achieved',
        message: 'CSE Building has achieved 15% energy reduction target for November.',
        department: 'CSE',
        timestamp: '2025-11-07T18:00:00Z',
        severity: 'low',
        acknowledged: true
      },
      {
        id: 3,
        type: 'CRITICAL',
        title: 'Budget Limit Approaching',
        message: 'Mechanical Engineering dept at 95% of monthly energy budget.',
        department: 'MECH',
        timestamp: '2025-11-08T06:15:00Z',
        severity: 'high',
        acknowledged: false
      }
    ];
  }

  generateFinancialData() {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov'];
    return {
      monthlyBudgets: months.map(month => ({
        month,
        allocated: 45000 + Math.random() * 10000,
        spent: 35000 + Math.random() * 15000,
        projected: 40000 + Math.random() * 8000
      })),
      savingsTracking: {
        targetSavings: 125000,
        actualSavings: 98500,
        projectedYearEnd: 145000
      },
      costBreakdown: {
        electricity: 65,
        heating: 15,
        cooling: 12,
        transport: 5,
        waste: 3
      }
    };
  }

  // API Methods
  getFormattedData() {
    // For compatibility with DepartmentsPage
    const departmentsWithSummary = this.departments.map(dept => {
      const recent = this.energyData.filter(d => {
        const daysDiff = (new Date() - new Date(d.timestamp)) / (1000 * 60 * 60 * 24);
        return daysDiff <= 30 && d.departmentId === dept.id;
      });

      const totalConsumption = recent.reduce((sum, d) => sum + d.kwhUsed, 0);
      const totalCost = recent.reduce((sum, d) => sum + d.costUsd, 0);
      const avgEfficiency = recent.reduce((sum, d) => sum + d.efficiency, 0) / recent.length || 80;

      return {
        id: dept.id,
        name: dept.name,
        code: dept.code,
        totalConsumption: Math.round(totalConsumption),
        monthlyCost: Math.round(totalCost),
        efficiencyScore: Math.round(avgEfficiency),
        occupancy: dept.occupancy,
        status: Math.random() > 0.8 ? 'Maintenance' : 'Active',
        trend: (Math.random() - 0.5) * 10, // -5 to +5 trend
        area: dept.area,
        floors: dept.floors
      };
    });

    return {
      departments: departmentsWithSummary,
      alerts: this.alerts,
      aiSuggestions: this.aiSuggestions,
      totalConsumption: departmentsWithSummary.reduce((sum, d) => sum + d.totalConsumption, 0),
      totalCost: departmentsWithSummary.reduce((sum, d) => sum + d.monthlyCost, 0),
      avgEfficiency: departmentsWithSummary.reduce((sum, d) => sum + d.efficiencyScore, 0) / departmentsWithSummary.length
    };
  }

  getDashboardData() {
    const recent = this.energyData.filter(d => {
      const daysDiff = (new Date() - new Date(d.timestamp)) / (1000 * 60 * 60 * 24);
      return daysDiff <= 1;
    });

    const totalCarbon = recent.reduce((sum, d) => sum + d.carbonKg, 0);
    const totalCost = recent.reduce((sum, d) => sum + d.costUsd, 0);
    const totalKwh = recent.reduce((sum, d) => sum + d.kwhUsed, 0);

    const departmentSummaries = this.departments.map(dept => {
      const deptData = recent.filter(d => d.departmentId === dept.id);
      return {
        departmentName: dept.name,
        departmentCode: dept.code,
        totalKwh: deptData.reduce((sum, d) => sum + d.kwhUsed, 0),
        totalCarbonKg: deptData.reduce((sum, d) => sum + d.carbonKg, 0),
        totalCostUsd: deptData.reduce((sum, d) => sum + d.costUsd, 0),
        readingCount: deptData.length,
        efficiency: dept.efficiency_rating,
        color: dept.color
      };
    });

    return {
      totalCarbonFootprint: totalCarbon,
      totalCostUsd: totalCost,
      totalKwhUsed: totalKwh,
      departmentSummaries,
      aiSuggestions: this.aiSuggestions.slice(0, 3),
      alerts: this.alerts.filter(a => !a.acknowledged),
      lastUpdated: new Date().toISOString()
    };
  }

  getAnalyticsData(timeRange = '30d') {
    const days = timeRange === '7d' ? 7 : timeRange === '30d' ? 30 : 90;
    const filtered = this.energyData.filter(d => {
      const daysDiff = (new Date() - new Date(d.timestamp)) / (1000 * 60 * 60 * 24);
      return daysDiff <= days;
    });

    return {
      timeSeriesData: this.groupByTimeAndSource(filtered),
      departmentComparison: this.getDepartmentComparison(filtered),
      trends: this.calculateTrends(filtered),
      predictions: this.generatePredictions()
    };
  }

  getDepartments() {
    return this.departments.map(dept => ({
      ...dept,
      recentData: this.energyData
        .filter(d => d.departmentId === dept.id)
        .slice(-7) // Last 7 days
        .reduce((acc, d) => ({
          totalKwh: acc.totalKwh + d.kwhUsed,
          totalCost: acc.totalCost + d.costUsd,
          totalCarbon: acc.totalCarbon + d.carbonKg
        }), { totalKwh: 0, totalCost: 0, totalCarbon: 0 })
    }));
  }

  getAllSuggestions() {
    return this.aiSuggestions;
  }

  getAlerts() {
    return this.alerts;
  }

  getFinancialData() {
    return this.financialData;
  }

  groupByTimeAndSource(data) {
    const grouped = {};
    data.forEach(d => {
      const date = new Date(d.timestamp).toISOString().split('T')[0];
      if (!grouped[date]) grouped[date] = {};
      if (!grouped[date][d.sourceType]) grouped[date][d.sourceType] = 0;
      grouped[date][d.sourceType] += d.kwhUsed;
    });
    return grouped;
  }

  getDepartmentComparison(data) {
    return this.departments.map(dept => {
      const deptData = data.filter(d => d.departmentId === dept.id);
      return {
        name: dept.name,
        code: dept.code,
        totalConsumption: deptData.reduce((sum, d) => sum + d.kwhUsed, 0),
        avgEfficiency: deptData.reduce((sum, d) => sum + d.efficiency, 0) / deptData.length,
        color: dept.color
      };
    });
  }

  calculateTrends(data) {
    // Simple trend calculation - in real app would use more sophisticated analysis
    return {
      energyTrend: -8.5, // % change
      costTrend: -12.3,
      carbonTrend: -15.2,
      efficiencyTrend: 6.8
    };
  }

  generatePredictions() {
    return {
      nextMonth: {
        expectedConsumption: 125000,
        estimatedCost: 15000,
        carbonFootprint: 56250
      },
      yearEnd: {
        expectedConsumption: 1400000,
        estimatedCost: 168000,
        carbonFootprint: 630000
      }
    };
  }
}

export default new TestDataService();