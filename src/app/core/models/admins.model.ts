import { User, Course, Classe } from ".";

export interface Admin extends User{
    courses: Course;
    classe: Classe
  }