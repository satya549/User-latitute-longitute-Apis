


export async function CreateUser (req, res){
    try {
        const { name, email, password, address, latitude, longitude } = req.body;

    if (!name || !email || !password || !address || !latitude || !longitude) {
      throw new Error("Please provide all required fields.");
    }
    } catch (error) {
        
    }
}