import { db, Table } from './db.config.js'

// Create or Update
const createOrUpdate = async (data = {}) => {
    const params = {
        TableName: Table,
        Item: data
    }

    try {
        await db.put(params).promise()
        return { success: true }
    } catch (error) {
        console.log(error);
        return { success: false }
    }
}

// Read all
const readAll = async () => {
    const params = {
        TableName: Table
    }

    try {
        const { Items = [] } = await db.scan(params).promise()
        return { success: true, data: Items }

    } catch (error) {
        return { success: false, data: null }
    }

}

// Read by ID
const getById = async (value, key = 'id') => {
    const params = {
        TableName: Table,
        Key: {
            [key]: parseInt(value)
        }
    }
    try {
        const { Item = {} } = await db.get(params).promise()
        return { success: true, data: Item }
    } catch (error) {
        return { success: false, data: null }
    }
}

// Delete by ID
const deleteById = async (value, key = 'id') => {
    const params = {
        TableName: Table,
        Key: {
            [key]: parseInt(value)
        }
    }

    try {
        await db.delete(params).promise()
        return { success: true }

    } catch (error) {
        return { success: false }
    }
}


export {
    createOrUpdate,
    readAll,
    getById,
    deleteById
}
