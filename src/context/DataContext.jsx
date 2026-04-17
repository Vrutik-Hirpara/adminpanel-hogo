import React, { createContext, useContext, useState, useCallback, useEffect } from "react";
import {
  EmployeeAPI,
  LeadsAPI,
  RegionsAPI,
  DepartmentAPI,
  RolesAPI,
  BranchAPI,
  HolidayAPI,
  EmployeeAttendanceAPI,
} from "../services";

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [employees, setEmployees] = useState([]);
  const [leads, setLeads] = useState([]);
  const [regions, setRegions] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [roles, setRoles] = useState([]);
  const [branches, setBranches] = useState([]);
  const [holidays, setHolidays] = useState([]);
  const [hrEmployees, setHrEmployees] = useState([]);
  const [todayAttendance, setTodayAttendance] = useState([]);

  // Loading states
  const [loading, setLoading] = useState({
    employees: false,
    leads: false,
    regions: false,
    departments: false,
    roles: false,
    branches: false,
    holidays: false,
    hrEmployees: false,
    todayAttendance: false,
  });

  const fetchData = useCallback(async (key, apiCall, setter) => {
    setLoading((prev) => ({ ...prev, [key]: true }));
    try {
      const res = await apiCall();
      const data = res.data?.data || res.data || [];
      setter(data);
      return data;
    } catch (err) {
      console.error(`Error fetching ${key}:`, err);
      return [];
    } finally {
      setLoading((prev) => ({ ...prev, [key]: false }));
    }
  }, []);

  const refreshEmployees = useCallback(() => fetchData("employees", EmployeeAPI.getAll, setEmployees), [fetchData]);
  const refreshLeads = useCallback(() => fetchData("leads", LeadsAPI.getAll, setLeads), [fetchData]);
  const refreshRegions = useCallback(() => fetchData("regions", RegionsAPI.getAll, setRegions), [fetchData]);
  const refreshDepartments = useCallback(() => fetchData("departments", DepartmentAPI.getAll, setDepartments), [fetchData]);
  const refreshRoles = useCallback(() => fetchData("roles", RolesAPI.getAll, setRoles), [fetchData]);
  const refreshBranches = useCallback(() => fetchData("branches", BranchAPI.getAll, setBranches), [fetchData]);
  const refreshHolidays = useCallback(() => fetchData("holidays", HolidayAPI.getAll, setHolidays), [fetchData]);
  const refreshHrEmployees = useCallback(() => fetchData("hrEmployees", EmployeeAPI.getHR, setHrEmployees), [fetchData]);
  const refreshTodayAttendance = useCallback(() => {
    const today = new Date().toISOString().split("T")[0];
    return fetchData("todayAttendance", () => EmployeeAttendanceAPI.getByDate(today), setTodayAttendance);
  }, [fetchData]);

  // Lazy loaders
  const getEmployees = useCallback(() => {
    if (employees.length === 0 && !loading.employees) refreshEmployees();
    return employees;
  }, [employees, loading.employees, refreshEmployees]);

  const getLeads = useCallback(() => {
    if (leads.length === 0 && !loading.leads) refreshLeads();
    return leads;
  }, [leads, loading.leads, refreshLeads]);

  const getRegions = useCallback(() => {
    if (regions.length === 0 && !loading.regions) refreshRegions();
    return regions;
  }, [regions, loading.regions, refreshRegions]);

  const getDepartments = useCallback(() => {
    if (departments.length === 0 && !loading.departments) refreshDepartments();
    return departments;
  }, [departments, loading.departments, refreshDepartments]);

  const getRoles = useCallback(() => {
    if (roles.length === 0 && !loading.roles) refreshRoles();
    return roles;
  }, [roles, loading.roles, refreshRoles]);

  const getBranches = useCallback(() => {
    if (branches.length === 0 && !loading.branches) refreshBranches();
    return branches;
  }, [branches, loading.branches, refreshBranches]);

  const getHolidays = useCallback(() => {
    if (holidays.length === 0 && !loading.holidays) refreshHolidays();
    return holidays;
  }, [holidays, loading.holidays, refreshHolidays]);

  const getHrEmployees = useCallback(() => {
    if (hrEmployees.length === 0 && !loading.hrEmployees) refreshHrEmployees();
    return hrEmployees;
  }, [hrEmployees, loading.hrEmployees, refreshHrEmployees]);

  const getTodayAttendance = useCallback(() => {
    if (todayAttendance.length === 0 && !loading.todayAttendance) refreshTodayAttendance();
    return todayAttendance;
  }, [todayAttendance, loading.todayAttendance, refreshTodayAttendance]);

  const value = {
    employees, refreshEmployees, getEmployees,
    leads, refreshLeads, getLeads,
    regions, refreshRegions, getRegions,
    departments, refreshDepartments, getDepartments,
    roles, refreshRoles, getRoles,
    branches, refreshBranches, getBranches,
    holidays, refreshHolidays, getHolidays,
    hrEmployees, refreshHrEmployees, getHrEmployees,
    todayAttendance, refreshTodayAttendance, getTodayAttendance,
    loading
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
};
