import {
  solutions,
  projects,
  projectDetails,
  teamMembers,
  partnerTypes,
  contactSubmissions,
  faqs,
  type Solution,
  type InsertSolution,
  type Project,
  type InsertProject,
  type ProjectDetails,
  type InsertProjectDetails,
  type TeamMember,
  type InsertTeamMember,
  type PartnerType,
  type InsertPartnerType,
  type ContactSubmission,
  type InsertContactSubmission,
  type Faq,
  type InsertFaq,
} from "@shared/schema";
import { db } from "./db";
import { eq, desc, asc } from "drizzle-orm";

export interface IStorage {
  // Solutions
  getSolutions(): Promise<Solution[]>;
  getSolutionBySlug(slug: string): Promise<Solution | undefined>;
  createSolution(solution: InsertSolution): Promise<Solution>;

  // Projects
  getProjects(): Promise<Project[]>;
  getFeaturedProjects(): Promise<Project[]>;
  getProjectBySlug(slug: string): Promise<Project | undefined>;
  createProject(project: InsertProject): Promise<Project>;
  getProjectDetailsByProjectId(projectId: string): Promise<ProjectDetails | undefined>;
  createProjectDetails(details: InsertProjectDetails): Promise<ProjectDetails>;

  // Team Members
  getTeamMembers(): Promise<TeamMember[]>;
  createTeamMember(member: InsertTeamMember): Promise<TeamMember>;

  // Partner Types
  getPartnerTypes(): Promise<PartnerType[]>;
  createPartnerType(partnerType: InsertPartnerType): Promise<PartnerType>;

  // Contact Submissions
  createContactSubmission(submission: InsertContactSubmission): Promise<ContactSubmission>;
  getContactSubmissions(): Promise<ContactSubmission[]>;

  // FAQs
  getFaqs(): Promise<Faq[]>;
  createFaq(faq: InsertFaq): Promise<Faq>;
}

export class DatabaseStorage implements IStorage {
  // Solutions
  async getSolutions(): Promise<Solution[]> {
    return await db
      .select()
      .from(solutions)
      .where(eq(solutions.isActive, true))
      .orderBy(asc(solutions.order), asc(solutions.title));
  }

  async getSolutionBySlug(slug: string): Promise<Solution | undefined> {
    const [solution] = await db
      .select()
      .from(solutions)
      .where(eq(solutions.slug, slug));
    return solution;
  }

  async createSolution(solutionData: InsertSolution): Promise<Solution> {
    const [solution] = await db
      .insert(solutions)
      .values(solutionData)
      .returning();
    return solution;
  }

  // Projects
  async getProjects(): Promise<Project[]> {
    return await db
      .select()
      .from(projects)
      .where(eq(projects.isActive, true))
      .orderBy(desc(projects.createdAt));
  }

  async getFeaturedProjects(): Promise<Project[]> {
    return await db
      .select()
      .from(projects)
      .where(eq(projects.isFeatured, true))
      .orderBy(desc(projects.createdAt))
      .limit(4);
  }

  async getProjectBySlug(slug: string): Promise<Project | undefined> {
    const [project] = await db
      .select()
      .from(projects)
      .where(eq(projects.slug, slug));
    return project;
  }

  async createProject(projectData: InsertProject): Promise<Project> {
    const [project] = await db
      .insert(projects)
      .values(projectData)
      .returning();
    return project;
  }

  async getProjectDetailsByProjectId(projectId: string): Promise<ProjectDetails | undefined> {
    const [details] = await db
      .select()
      .from(projectDetails)
      .where(eq(projectDetails.projectId, projectId));
    return details;
  }

  async createProjectDetails(detailsData: InsertProjectDetails): Promise<ProjectDetails> {
    const [details] = await db
      .insert(projectDetails)
      .values(detailsData)
      .returning();
    return details;
  }

  // Team Members
  async getTeamMembers(): Promise<TeamMember[]> {
    return await db
      .select()
      .from(teamMembers)
      .where(eq(teamMembers.isActive, true))
      .orderBy(asc(teamMembers.order), asc(teamMembers.name));
  }

  async createTeamMember(memberData: InsertTeamMember): Promise<TeamMember> {
    const [member] = await db
      .insert(teamMembers)
      .values(memberData)
      .returning();
    return member;
  }

  // Partner Types
  async getPartnerTypes(): Promise<PartnerType[]> {
    return await db
      .select()
      .from(partnerTypes)
      .where(eq(partnerTypes.isActive, true))
      .orderBy(asc(partnerTypes.order), asc(partnerTypes.title));
  }

  async createPartnerType(partnerTypeData: InsertPartnerType): Promise<PartnerType> {
    const [partnerType] = await db
      .insert(partnerTypes)
      .values(partnerTypeData)
      .returning();
    return partnerType;
  }

  // Contact Submissions
  async createContactSubmission(submissionData: InsertContactSubmission): Promise<ContactSubmission> {
    const [submission] = await db
      .insert(contactSubmissions)
      .values(submissionData)
      .returning();
    return submission;
  }

  async getContactSubmissions(): Promise<ContactSubmission[]> {
    return await db
      .select()
      .from(contactSubmissions)
      .orderBy(desc(contactSubmissions.createdAt));
  }

  // FAQs
  async getFaqs(): Promise<Faq[]> {
    return await db
      .select()
      .from(faqs)
      .where(eq(faqs.isActive, true))
      .orderBy(asc(faqs.order), asc(faqs.question));
  }

  async createFaq(faqData: InsertFaq): Promise<Faq> {
    const [faq] = await db
      .insert(faqs)
      .values(faqData)
      .returning();
    return faq;
  }
}

export const storage = new DatabaseStorage();
