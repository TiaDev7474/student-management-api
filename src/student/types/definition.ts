export interface IStudentDto {
    firstname: string,
    lastname: string,
}

export interface IStudent {
    id: string
    firstname: string,
    lastname: string,
    createdAt: Date,
    updatedAt: Date
}

export  interface IStudents {
    students: IStudent[]
}
